#!/usr/bin/env python3
import platform
import subprocess
import sys
import os
import ssl
import urllib.request
import stat
import shutil
import time
from pathlib import Path

BIOME_VERSION = "2.4.2"
BIOME_DIR = Path(__file__).parent / ".biome"
TIMEOUT = 30
MAX_RETRIES = 3

def get_platform():
    system, machine = platform.system().lower(), platform.machine().lower()
    platform_map = {"darwin": "darwin", "linux": "linux", "windows": "win32"}
    platform_name = platform_map.get(system)
    if not platform_name:
        sys.exit(f"Unsupported OS: {system}")
    if platform_name == "linux":
        try:
            if Path("/proc/self/maps").exists():
                with open("/proc/self/maps") as f:
                    if "musl" in f.read():
                        platform_name = "linux-musl"
        except Exception:
            pass
    arch_map = {"x86_64": "x64", "amd64": "x64", "arm64": "arm64", "aarch64": "arm64"}
    arch = arch_map.get(machine)
    if not arch:
        sys.exit(f"Unsupported architecture: {machine}")
    return platform_name, arch

def find_biome():
    if path := shutil.which("biome"):
        return Path(path)
    candidate = Path.home() / ".biome" / "bin" / "biome"
    if candidate.exists() and os.access(candidate, os.X_OK):
        return candidate
    return None

def check_version(executable, version):
    try:
        result = subprocess.run(
            [str(executable), "--version"],
            capture_output=True, text=True, timeout=10, check=True
        )
        return version in result.stdout
    except Exception:
        return False

def download_file(url, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    for attempt in range(MAX_RETRIES):
        try:
            ctx = ssl.create_default_context()
            with urllib.request.urlopen(url, context=ctx, timeout=TIMEOUT) as resp:
                tmp_path = target.with_suffix(target.suffix + ".tmp")
                with open(tmp_path, "wb") as f:
                    f.write(resp.read())
                tmp_path.replace(target)
                return True
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return False
        except Exception:
            if attempt < MAX_RETRIES - 1:
                time.sleep(2 ** attempt)
                continue
    return False

def download_biome():
    platform_name, arch = get_platform()
    ext = ".exe" if platform.system().lower() == "windows" else ""
    suffix = "-musl" if platform_name == "linux-musl" else ""
    filename = f"biome-{platform_name}-{arch}{suffix}{ext}"
    url = f"https://github.com/biomejs/biome/releases/download/biome@{BIOME_VERSION}/{filename}"
    target = BIOME_DIR / f"biome{ext}"
    if target.exists() and check_version(target, BIOME_VERSION):
        return target
    if not download_file(url, target):
        sys.exit(f"Failed to download: {url}")
    if platform.system().lower() != "windows":
        target.chmod(target.stat().st_mode | stat.S_IXUSR | stat.S_IXGRP | stat.S_IXOTH)
    return target

def install_via_package_manager():
    system = platform.system().lower()
    if system == "darwin" and shutil.which("brew"):
        subprocess.run(["brew", "install", "biome"], capture_output=True, timeout=180)
        return True
    if system == "windows":
        for manager, cmd in [("choco", ["choco", "install", "biome", "-y"]), ("scoop", ["scoop", "install", "biome"])]:
            if shutil.which(manager):
                subprocess.run(cmd, capture_output=True, timeout=180)
                return True
    if shutil.which("curl"):
        subprocess.run(
            "sh -c 'curl -fsSL https://biomejs.dev/install.sh | sh'",
            shell=True, capture_output=True, timeout=120
        )
        return True
    return False

def run_lint(executable):
    src_dir = Path(__file__).parent.parent / "src"
    if not src_dir.exists():
        return 0
    result = subprocess.run([str(executable), "lint", str(src_dir)])
    return result.returncode

def main():
    if exe := find_biome():
        if check_version(exe, BIOME_VERSION):
            sys.exit(run_lint(exe))
    install_via_package_manager()
    if exe := find_biome():
        if check_version(exe, BIOME_VERSION):
            sys.exit(run_lint(exe))
    exe = download_biome()
    sys.exit(run_lint(exe))

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(130)
    except Exception as e:
        sys.exit(2)
