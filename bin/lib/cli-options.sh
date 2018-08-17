#!/bin/bash

# Universal Bash parameter parsing
# Parses equal sign separated params into local variables (--name=bob creates variable $name=="bob")
# Standalone named parameter value will equal its param name (--force creates variable $force=="force")
# Parses multi-valued named params into an array (--path=path1 --path=path2 creates ${path[*]} array)
# Parses un-named params into ${ARGV[*]} array
# Additionally puts all named params raw into ${ARGN[*]} array
# Additionally puts all standalone "option" params raw into ${ARGO[*]} array
# @author Oleksii Chekulaiev
# @version v1.4 (Jun-26-2018)
parse_params ()
{
    local existing_named
    local ARGV=() # un-named params
    local ARGN=() # named params
    local ARGO=() # options (--params)
    echo "local ARGV=(); local ARGN=(); local ARGO=();"
    while [[ "$1" != "" ]]; do
        # Escape asterisk to prevent bash asterisk expansion
        _escaped=${1/\*/\'\"*\"\'}
        # If equals delimited named parameter
        if [[ "$1" =~ ^..*=..* ]]; then
            # Add to named parameters array
            echo "ARGN+=('$_escaped');"
            # key is part before first =
            local _key=$(echo "$1" | cut -d = -f 1)
            # val is everything after key and = (protect from param==value error)
            local _val="${1/$_key=}"
            # remove dashes from key name
            _key=${_key//\-}
            # skip when key is empty
            if [[ "$_key" == "" ]]; then
                shift
                continue
            fi
            # search for existing parameter name
            if (echo "$existing_named" | grep "\b$_key\b" >/dev/null); then
                # if name already exists then it's a multi-value named parameter
                # re-declare it as an array if needed
                if ! (declare -p _key 2> /dev/null | grep -q 'declare \-a'); then
                    echo "$_key=(\"\$$_key\");"
                fi
                # append new value
                echo "$_key+=('$_val');"
            else
                # single-value named parameter
                echo "local $_key=\"$_val\";"
                existing_named=" $_key"
            fi
        # If standalone named parameter
        elif [[ "$1" =~ ^\-. ]]; then
            # remove dashes
            local _key=${1//\-}
            # skip when key is empty
            if [[ "$_key" == "" ]]; then
                shift
                continue
            fi
            # Add to options array
            echo "ARGO+=('$_escaped');"
            echo "local $_key=\"$_key\";"
        # non-named parameter
        else
            # Escape asterisk to prevent bash asterisk expansion
            _escaped=${1/\*/\'\"*\"\'}
            echo "ARGV+=('$_escaped');"
        fi
        shift
    done
}
