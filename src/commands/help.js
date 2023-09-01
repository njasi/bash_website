const helpString =
`ls [-l] [-a] [dir]            Print dir contents
cd [dir]                      Change the current directory to dir
pwd                           Print the working directory
history                       Print terminal history
cat [-n] file                 Print file contents
touch file                    Create empty file
mkdir dir                     Make an empty directory dir
mv [-n] source target         Move a source to target
cp [-r] [-R] source target    Copies source to target
rm [-r] [-R] file             Removes file file
rmdir dir                     Removes empty directory DIR
help                          Hopefully you know this one
echo                          Repeats content back
reboot                        Reboot the terminal
welcome                       Show the welcome message
clear                         Clear the contents of the terminal`;

function help(env, args) {
  let exitCode = 0;
  env.output(helpString);
  env.exit(exitCode);
}

module.exports = help;
