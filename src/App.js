import "./App.css";
import { TermPrompt } from "./components";
import Terminal from "./components/Terminal";

const INIT_OUTPUT = [
  {
    prompt: <TermPrompt user={"user"} host={"computer"} />,
    command: "ssh guest@njasi.com",
    result: `
Welcome to Nick Jasinski's Website

* (class=green)(Github):         [https://github.com/njasi](https://github.com/njasi)
* (class=green)(Linkedin):       [https://www.linkedin.com/in/njasi](https://www.linkedin.com/in/njasi)
* (class=green)(Email):          [nick@jasinski3.com](mailto:nick@jasinski3.com)

Expanded Security Maintenance for Applications is not enabled.

7 updates can be applied immediately.
6 of these updates are standard security updates.
To see these additional updates run: apt list --upgradable

For a list of available commands please type "(class=green bold)(help)"

*** System restart required ***
Last login: filler_time from filler_ip
   `,
  },
];

function App() {
  return <Terminal init={INIT_OUTPUT} />;
}

export default App;
