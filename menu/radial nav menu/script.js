"use strict";
const MenuOption = (props) => {
    const { toggled } = React.useContext(AppContext);
    const className = `menu-${props.type}-option`, delay = toggled ? 200 : 0;
    const styles = {
        transitionDelay: `${delay + (50 * props.index)}ms`
    };
    return (React.createElement("a", { href: props.url, target: "_blank", className: className, disabled: !toggled, style: styles },
        React.createElement("i", { className: props.icon }),
        React.createElement("h3", { className: props.type === "quick" ? "tooltip" : "label" }, props.label)));
};
const Menu = () => {
    const { toggled } = React.useContext(AppContext);
    const profileImage = "./3.jpg";
    const getOptions = (options, type) => {
        return options.map((option, index) => (React.createElement(MenuOption, { key: option.label, icon: option.icon, index: index, label: option.label, url: option.url, type: type })));
    };
    const getQuickOptions = () => {
        return getOptions([{
                icon: "fa-solid fa-bell", label: "Notifications", url: "#"
            }, {
                icon: "fa-solid fa-gear", label: "Settings", url: "#"
            }, {
                icon: "fa-solid fa-moon", label: "Theme", url: "#"
            }], "quick");
    };
    const getFullOptions = () => {
        return getOptions([{
                icon: "fa-solid fa-house", label: "Home", url: "#"
            }, {
                icon: "fa-solid fa-user", label: "Profile", url: "#"
            }, {
                icon: "fa-solid fa-chart-line", label: "Dashboard", url: "#"
            }, {
                icon: "fa-solid fa-heart", label: "Subscriptions", url: "#"
            }, {
                icon: "fa-solid fa-wallet", label: "Wallet", url: "#"
            }], "full");
    };
    return (React.createElement("div", { id: "menu", className: classNames({ toggled }) },
        React.createElement("div", { id: "menu-background-wrapper" },
            React.createElement("div", { id: "menu-background" })),
        React.createElement("img", { id: "menu-profile-image", src: profileImage }),
        React.createElement("div", { id: "menu-quick-options" }, getQuickOptions()),
        React.createElement("div", { id: "menu-full-options" }, getFullOptions())));
};
const AppContext = React.createContext(null);
const App = () => {
    const [toggled, setToggledTo] = React.useState(false);
    React.useEffect(() => {
        setTimeout(() => setToggledTo(true), 1000);
    }, []);
    const handleOnClick = () => setToggledTo(!toggled);
    return (React.createElement(AppContext.Provider, { value: { toggled } },
        React.createElement("div", { id: "app" },
            React.createElement(Menu, null),
            React.createElement("button", { id: "menu-toggle", type: "button", onClick: handleOnClick },
                React.createElement("i", { className: toggled ? "fa-solid fa-xmark-large" : "fa-solid fa-bars-staggered" })),
            React.createElement("a", { id: "youtube-link", href: "https://www.youtube.com/c/TheTerminalBoy", target: "_blank" },
                React.createElement("i", { className: "fa-brands fa-youtube" }),
                React.createElement("span", null, "Tutorial")))));
};
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));