#Purpose:

I use Github with a team of developers to develop a large web application. Although Github is a wonderful tool, there are a few pain points I needed to fix myself.

This extension allows users to hide files in pull requests. I find this helpful when pull requests are longer than a few files.

#To Install:

[Install Github Workflow from the Chrome Web Store!](http://bit.ly/1MKUxmg)

#Fork & Contribute
![build status](https://travis-ci.org/djds23/github-notif-helper.svg?branch=master)
![GitHub version](https://badge.fury.io/gh/djds23%2Fgithub-notif-helper.svg)
![documentation status](https://doc.esdoc.org/github.com/djds23/github-notif-helper/badge.svg)


This project was built with ES2015 and Babel, using Gulp as the build tool.

For these to run, you must first install Node, then Gulp globally.

Once that is done, you can download the dependencies and build the project with the following commands:

```shell
$ npm install
$ gulp
```

From here you can load the `dev/` directory into chrome as an unpacked extension. This build will provide you with source maps for the minified code.

As you edit the files in `src/`, run gulp to build the code and reload the extension to see your changes.

Testing is done with Mocha & Chai. To check if your changes break anything, run `npm test`.

[If you would like to get a feel for the code, check out the ESDOC for it here.](https://doc.esdoc.org/github.com/djds23/github-notif-helper/)


[Credit for the icon goes to Designmodo](https://www.iconfinder.com/icons/103184/check_checkmark_ok_yes_icon)

