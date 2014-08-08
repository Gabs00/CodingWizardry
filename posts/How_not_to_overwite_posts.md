### Azure, Git, Ghost and not overwriting your blog posts

If you're like me, you probably got here after trying to `git push` a theme to your Ghost blog on Azure and overwriting all of your blog posts.

Hopefully you're not, and doing some investigative work on pushing updates to your azure blog.

The key to not overwriting your previous posts is to add `content/data` to your `.gitignore` file. And then removing the folder from gits tracking. 

The contents of the `content/data` folder contain your ghost.db where your blog posts are saved. Pushing to azure without ignoring this directory will result in overwriting the ghost.db file, and losing all of those precious posts.

See the steps below for adding the folder to your `.gitignore` file. 

<strong>Note</strong>: Before completing the below instructions, be sure to log into the Ghost/Debug panel and export your Ghost Data. That way if you don't quite get it right the first time, you will still have all your precious info. With these instructions, if you do not already have a `.gitignore` file, one will be created.

From your command line, using your favorite shell (I'm using powershell), in the root directory of your project:

```bash
prompt > echo "content/data
> *.db" >> .gitignore
prompt > git rm -r --cached content/data
prompt > git rm -r --cached *.db
prompt > git status
prompt > git add .
prompt > git commit

```

<strong>Note</strong>: The newline after `content/data`. It is needed so that the `*.db` will be on its own line. that the status line is not required, but it will show you what will be changed.

### Update:

It turns out before that I had not yet fully protected my blog posts by just adding `content/data` to the `.gitignore` file, but also needed to add `*.db`.

I went the extra measure of logging directly onto the gitweb console of my site at adding the same `.gitignore` file manually, and followed the git rm steps there as well before committing, pulling to my local repo and finally pushing to the azure master.

I also did a test push to the server and all seems to be working well, will no loss of content.

Also, a new habit I am forming is to maintain a seperate repo on my github account that will keep a copy of all my blog posts and code snippets ready available. You can find that [here](https://github.com/Gabs00/CodingWizardry)

    
