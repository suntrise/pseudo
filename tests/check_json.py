#!/usr/bin/env python3
import json
import sys
import glob

DATA_DIR = "data"

GREEN = "\033[32m"
YELLOW = "\033[33m"
RESET = "\033[0m"


def find_duplicate_keys(content):
    duplicates = []

    def check_pairs(pairs):
        seen = {}
        obj = {}
        for key, value in pairs:
            if key in seen:
                duplicates.append((key, seen[key] + 1))
            seen[key] = seen.get(key, 0) + 1
            obj[key] = value
        return obj

    json.loads(content, object_pairs_hook=check_pairs)
    return duplicates


def main():
    files = sorted(glob.glob(f"{DATA_DIR}/**/*.json", recursive=True))
    if not files:
        print(f"WARNING: No JSON files found in {DATA_DIR}/")
        sys.exit(2)

    has_errors = False
    for path in files:
        warnings = []
        try:
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            dupes = find_duplicate_keys(content)
            for key, count in dupes:
                warnings.append(f"duplicate key: '{key}' (appeared {count + 1} times)")
        except json.JSONDecodeError as e:
            warnings.append(f"invalid JSON: {e}")

        if warnings:
            has_errors = True
            print(f"{YELLOW}[WARN]{RESET} {path}:")
            for w in warnings:
                print(f"  {w}")
        else:
            print(f"{GREEN}[PASS]{RESET} {path}")

    if has_errors:
        sys.exit(1)
    else:
        print(f"\nAll JSON files are valid.")
        sys.exit(0)


if __name__ == "__main__":
    main()
