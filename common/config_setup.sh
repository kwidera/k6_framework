#!/bin/bash

json_init=$'[ '
json_end=$' ]'

resultFile="./load_config.json"

#remove file if existing
rm -f $resultFile

files=()

if [ $# -eq 0 ]; then
  echo "Use all configurations in 'configs' folder"
  # #get json files as an array
  IFS=$'\n' read -r -d '' -a files < <( tree -fi configs | grep .json && printf '\0' )
else
  while [ 1 -le $# ]; do
    filePath=$1
    if [ -z $filePath ]; then
      echo "File '$1' not found in configs folder"
      exit 1
    else
      files+=($filePath)
    fi
    shift 1;
  done
fi

joinByString() {
  local separator="$1"
  shift
  local first="$1"
  shift
  printf "%s" "\"$first" "${@/#/$separator}" "\""
}

#parse results as an array form
result=$(joinByString "\", \"" ${files[@]})

#save to file
echo "$json_init""$result""$json_end" > $resultFile
