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

	yarn install;

	git init;
	git add .;
	git commit -m "Initial commit.";

	if [ -z $withoutgithooks ]; then
		chmod +x .githooks/*
		git config core.hooksPath .githooks
	fi;
}

execute_post_install "$@"
