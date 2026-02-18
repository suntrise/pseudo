#!/usr/bin/env python3
import sys
import glob

TEXT_EXTENSIONS = {
    ".html", ".css", ".js", ".json", ".md", ".yml", ".yaml", ".txt", ".py",
}

SCAN_PATTERNS = [
    "*.html",
    "*.css",
    "*.md",
    "*.yml",
    "*.yaml",
    "*.txt",
    "src/**/*.js",
    "data/**/*.json",
    "tests/**/*.py",
    ".github/**/*.yml",
]

GREEN = "\033[32m"
YELLOW = "\033[33m"
RESET = "\033[0m"


def main():
    files = set()
    for pattern in SCAN_PATTERNS:
        files.update(glob.glob(pattern, recursive=True))

    if not files:
        print("WARNING: No text files found.")
        sys.exit(2)

    warnings = []
    for path in sorted(files):
        try:
            with open(path, "rb") as f:
                content = f.read()
        except OSError:
            continue

        if not content:
            continue

        if not content.endswith(b"\n"):
            warnings.append(path)

    if warnings:
        print(f"{YELLOW}[WARN]{RESET} Missing trailing newline ({len(warnings)}):\n")
        for path in warnings:
            print(f"  {path}")
        print()
        sys.exit(1)
    else:
        print(f"{GREEN}[PASS]{RESET} All text files end with a newline")
        print(f"\nAll files are valid.")
        sys.exit(0)


if __name__ == "__main__":
    main()
