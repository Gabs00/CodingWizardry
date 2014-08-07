### Azure, Git, Ghost and not overwriting your blog posts

If you're like me, you probably got here after trying to `git push` a theme to your Ghost blog on Azure and overwriting all of your blog posts.

Hopefully you're not, and doing some investigative work on pushing updates to your azure blog.

The key to not overwriting your previous posts is to add `content/data` to your `.gitignore` file. And then removing the folder from gits tracking. 

The contents of the `content/data` folder contain your ghost.db where your blog posts are saved. Pushing to azure without ignoring this directory will result in overwriting the ghost.db file, and losing all of those precious posts.

See the steps below for adding the folder to your `.gitignore` file. 

<strong>Note</strong>: with these instructions, if you do not already have a `.gitignore` file, one will be created.

From your command line, using your favorite shell (I'm using powershell), in the root directory of your project:

```bash
prompt > echo "content/data" >> .gitignore
prompt > git rm -r --cached content/data
prompt > git status
prompt > git add .
prompt > git commit

```

Note that the status line is not required, but it will show you what will be changed.

Also, a new habit I am forming is to maintain a seperate repo on my github account that will keep a copy of all my blog posts and code snippets ready available. You can find that [here](https://github.com/Gabs00/CodingWizardry)

    
