# Wowot

**This project is no longer updated, do not hesitate to fork and update it if needed**

A discord bot for the wowo.

## 🤖 Project goals

[x] take a csv of people and their timezones as input
[x] be able to run inside a podman compliant image
[x] distribute the wowo every morning

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

Now with merge and squash
