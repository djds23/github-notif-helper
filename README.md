#Purpose:

I use Github with a team of developers to develop a large web application. Although Github is a wonderful tool, there are a few pain points I needed to fix myself.

This extension changes the color of the of notifications that I am participating in so I can quickly address issues relevant to me.
We also use Github for code reviews. This extension allows users to hide files in pull requests. I find this helpful when pull requests are longer than a few files.

#To Install:

[Install Github Workflow from the Chrome Web Store!](http://bit.ly/1MKUxmg)

#Fork & Contribute

This project was built with ES2015 and Babel, using Gulp as the build tool.

For these to run, you must first install Node, then Gulp globally.

Once that is done, you can download the dependencies and build the project with the following commands:

```shell
$ npm install
$ gulp
```

From here you can load the `dev/` directory into chrome as an unpacked extension. This build will provide you with source maps for the minified code.

As you edit the files in `src/`, run gulp to build the code and reload the extension to see your changes.


[Credit for the icon goes to Designmodo](https://www.iconfinder.com/icons/103184/check_checkmark_ok_yes_icon)

