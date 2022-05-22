# Wowot

A discord bot for the wowo.

## 🤖 Project goals

- take a csv of people and their city as input
- be able to run inside a podman compliant image
- handle the wowo for concerned people with a cron every 30 minutes 

## 🙋 Contribute

### Commit format

When writing a commit, please use the following format :

- A description of less than 80 characters
- Why the changes were made / how were they made (optional)

Please use multi line commits when adding descriptions. 

#### Example of a correct commit:

```
Update system tests script removing build step
    
We should stack build with --exec. That is the
proper way to execute something at the end of a build
else it will get very confused and exit before
finishing.
   
The script is needed because we cannot launch
shelltest within exec for reasons that i don't
quite understand...
```

### Merge policy

No merges, only rebases.
