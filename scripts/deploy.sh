#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"/..

scp ./dist/* janoscom:webapps/misc.janosgyerik.com/cyclefuel/
