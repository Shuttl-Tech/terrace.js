#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )";

# Code for file/function obtained from: https://stackoverflow.com/a/38153758/2968465
source ${DIR}/lib/cli-options.sh;

execute_post_install ()
{
	eval $(parse_params "$@")
	cd $destination;
	[[ -n "$withoutgithooks" ]] && echo "--without-githooks specified. Not adding terrace's githooks."

	if [ -z $withoutgithooks ]; then
		git init
		git config core.hooksPath .githooks
	fi;

	yarn install;
}

execute_post_install "$@"
