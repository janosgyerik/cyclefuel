#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"/..

rsync -va ./dist/* janoscom:webapps/misc.janosgyerik.com/cyclefuel/
