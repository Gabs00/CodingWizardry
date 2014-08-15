### Creating new branches

#### Syntax
  
  `git checkout -b <branch_name>`
  
1. When you create a branch, the new branch is a copy of your currently selected branch.
  * Example: 

      `master > git checkout -b new_branch` - creates a branch that is a copy of master
      `new_branch > git checkout -b new_branch_2` - creates another branch that is a copy of new_branch
      
2. You can combo changing to a branch and creating a new branch.
  * Example:

      `master > git checkout new_branch_2 -b new_branch_3` - creates a new branch that is a copy of new_branch_2
      
3. Deleting a branch (local). Change from the branch you wish to delete.
  * Example:

    `master > git branch -D <branch name>`
    
### Creating a fresh branch

1. Make sure to add as a remote the source repo, in this case from hackreactor (name it upstream)
  * Example:
  
      `master > git remote add upstream <link to repo>` - upstream can be any name you choose.

2. ~~Pull~~ Fetch the desired branch. Here we know hack reactor has a fresh copy in branch: master
  * Example:
  
      `master > git fetch upstream master` - master could be any desired branch name

3. The branch will be located in upstream/master. You should see this it in the console after the above command

4. Create a new branch from upstream/master
  * Example:

      `git checkout upstream/master -b fresh_branch` - where fresh_branch is the desired branch name.

Note: You can do the above with your pair if you're working from their repo. Just as them as a remote, pull the branch, and create a new branch from it.

#### Update:
The `pull` command has the effect of both fetching a copy of the branch and merging it into the current branch. I've replaced the command here with fetch. 
