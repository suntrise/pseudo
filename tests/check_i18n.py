#!/usr/bin/env python3
import json
import re
import sys
import unicodedata

I18N_FILE = "data/i18n.json"

FULLWIDTH_RANGES = [
    (0xFF01, 0xFF5F),
    (0xFFE0, 0xFFE6),
]

PLACEHOLDER_PATTERN = re.compile(r"\{[^}]+\}")


def is_fullwidth_char(ch):
    cp = ord(ch)
    for start, end in FULLWIDTH_RANGES:
        if start <= cp <= end:
            return True
    return False


def check_fullwidth(locales):
    warnings = []
    for lang, entries in locales.items():
        for key, value in entries.items():
            normalized_value = None
            for i, ch in enumerate(value):
                if is_fullwidth_char(ch):
                    if normalized_value is None:
                        normalized_value = unicodedata.normalize('NFKC', value)
                    warnings.append(
                        f"[{lang}.{key}] pos {i}: '{ch}' (U+{ord(ch):04X} {unicodedata.name(ch, 'UNKNOWN')})"
                        f"\n    context: ...{value[max(0, i - 10):i + 11]}..."
                        f"\n    Suggest: Replace entire string with: {repr(normalized_value)}"
                    )
    return warnings


def check_missing_keys(locales, base_lang="en"):
    warnings = []
    base_keys = set(locales.get(base_lang, {}).keys())
    for lang, entries in locales.items():
        if lang == base_lang:
            continue
        current_keys = set(entries.keys())
        for key in sorted(base_keys - current_keys):
            warnings.append(
                f"[{lang}] missing key: '{key}'"
                f"\n    Suggest: Add translation for '{key}' from {base_lang}"
            )
        for key in sorted(current_keys - base_keys):
            warnings.append(
                f"[{lang}] extra key: '{key}' (not in {base_lang})"
                f"\n    Suggest: Remove key or add to {base_lang} source"
            )
    return warnings


def check_empty_values(locales):
    warnings = []
    for lang, entries in locales.items():
        for key, value in entries.items():
            if not value or not value.strip():
                warnings.append(
                    f"[{lang}.{key}] empty or whitespace-only value"
                    "\n    Suggest: Provide valid translated content"
                )
    return warnings


def check_placeholders(locales, base_lang="en"):
    warnings = []
    base = locales.get(base_lang, {})
    for lang, entries in locales.items():
        if lang == base_lang:
            continue
        for key, value in entries.items():
            if key not in base:
                continue
            base_ph = set(PLACEHOLDER_PATTERN.findall(base[key]))
            curr_ph = set(PLACEHOLDER_PATTERN.findall(value))
            for ph in sorted(base_ph - curr_ph):
                warnings.append(
                    f"[{lang}.{key}] missing placeholder: {ph}"
                    f"\n    Suggest: Insert {ph} at appropriate position (match {base_lang} structure)"
                )
            for ph in sorted(curr_ph - base_ph):
                warnings.append(
                    f"[{lang}.{key}] extra placeholder: {ph}"
                    f"\n    Suggest: Remove {ph} to align with {base_lang} source"
                )
    return warnings


def check_whitespace(locales):
    warnings = []
    for lang, entries in locales.items():
        for key, value in entries.items():
            if value != value.strip():
                leading = value[:len(value) - len(value.lstrip())]
                trailing = value[len(value.rstrip()):]
                detail = []
                if leading:
                    detail.append(f"leading {repr(leading)}")
                if trailing:
                    detail.append(f"trailing {repr(trailing)}")
                warnings.append(
                    f"[{lang}.{key}] {', '.join(detail)}"
                    "\n    Suggest: Trim unnecessary whitespace characters"
                )
    return warnings


def main():
    try:
        with open(I18N_FILE, "r", encoding="utf-8") as f:
            locales = json.load(f)
    except FileNotFoundError:
        print(f"ERROR: {I18N_FILE} not found.")
        sys.exit(2)
    except json.JSONDecodeError as e:
        print(f"ERROR: Failed to parse {I18N_FILE}: {e}")
        sys.exit(2)

    checks = [
        ("Fullwidth characters", check_fullwidth(locales)),
        ("Missing/extra keys", check_missing_keys(locales)),
        ("Empty values", check_empty_values(locales)),
        ("Placeholder consistency", check_placeholders(locales)),
        ("Leading/trailing whitespace", check_whitespace(locales)),
    ]

    GREEN = "\033[32m"
    YELLOW = "\033[33m"
    RESET = "\033[0m"

    has_warnings = False
    for name, warnings in checks:
        if warnings:
            has_warnings = True
            print(f"{YELLOW}[WARN]{RESET} {name} ({len(warnings)}):\n")
            for w in warnings:
                print(f"  {w}")
            print()
        else:
            print(f"{GREEN}[PASS]{RESET} {name}")

    if has_warnings:
        sys.exit(1)
    else:
        print(f"\nAll checks passed for {I18N_FILE}.")
        sys.exit(0)


if __name__ == "__main__":
    main()
