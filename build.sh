#!/usr/bin/env bash

echo Building LightDM Webkit theme Hexagon....
echo
echo Installing packages....
# yarn

echo Building....
yarn build

sudo rm -rf /usr/share/lightdm-webkit/themes/hexagon

sudo mkdir /usr/share/lightdm-webkit/themes/hexagon

sudo cp dist/* /usr/share/lightdm-webkit/themes/hexagon
