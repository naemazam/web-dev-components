"use strict";
var ContentID;
(function (ContentID) {
    ContentID["AddServer"] = "Add Server";
    ContentID["Explore"] = "Explore";
    ContentID["Home"] = "Home";
})(ContentID || (ContentID = {}));
var CustomContentID;
(function (CustomContentID) {
    CustomContentID["GamingServer"] = "gaming-server";
    CustomContentID["PandaPeopleServer"] = "panda-people-server";
    CustomContentID["PizzaLoversServer"] = "pizza-lovers-server";
})(CustomContentID || (CustomContentID = {}));
var NavbarItemType;
(function (NavbarItemType) {
    NavbarItemType["Custom"] = "Custom";
    NavbarItemType["Default"] = "Default";
    NavbarItemType["Home"] = "Home";
})(NavbarItemType || (NavbarItemType = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["Away"] = "Away";
    UserStatus["Busy"] = "Busy";
    UserStatus["Offline"] = "Offline";
    UserStatus["Online"] = "Online";
})(UserStatus || (UserStatus = {}));
var TooltipDirection;
(function (TooltipDirection) {
    TooltipDirection["Right"] = "Right";
    TooltipDirection["Top"] = "Top";
})(TooltipDirection || (TooltipDirection = {}));
const Tooltip = (props) => {
    const direction = props.direction || TooltipDirection.Right;
    return (React.createElement("div", { className: classNames("tooltip", direction.toLowerCase()) },
        React.createElement("p", null, props.text)));
};
const ActiveContent = () => {
    const { state } = React.useContext(AppContext);
    const getContentIcon = () => {
        switch (state.activeContentID) {
            case ContentID.Home:
                return "fa-brands fa-discord";
            case ContentID.AddServer:
                return "fa-solid fa-plus";
            case ContentID.Explore:
                return "fa-solid fa-compass";
            case CustomContentID.GamingServer:
                return "fa-brands fa-python";
            case CustomContentID.PandaPeopleServer:
                return "fa-solid fa-shield-heart";
            case CustomContentID.PizzaLoversServer:
                return "fa-brands fa-youtube";
	
				
        }
    };
    return (React.createElement("div", { id: "active-content" },
        React.createElement("i", { key: state.activeContentID, className: getContentIcon() })));
};
const UserStatusIcon = (props) => {
    const getIcon = () => {
        switch (props.status) {
            case UserStatus.Away:
                return "fa-solid fa-moon";
            case UserStatus.Busy:
                return "fa-solid fa-do-not-enter";
            case UserStatus.Offline:
                return "fa-solid fa-circle-dot";
            case UserStatus.Online:
                return "fa-solid fa-circle";
        }
    };
    return (React.createElement("div", { className: classNames("user-status-icon", props.status.toLowerCase()) },
        React.createElement("i", { className: getIcon() })));
};
const UserIcon = (props) => {
    const { user } = props;
    const styles = {
        backgroundImage: `url(${user.image})`
    };
    return (React.createElement("div", { className: "user-icon", style: styles },
        React.createElement(UserStatusIcon, { status: user.status })));
};
const CurrentUserControlMenuButton = (props) => {
    const getIcon = () => {
        if (props.icon) {
            return (React.createElement("i", { className: props.icon }));
        }
        else if (props.status) {
            return (React.createElement(UserStatusIcon, { status: props.status }));
        }
    };
    const getDesc = () => {
        if (props.desc) {
            return (React.createElement("p", { className: "current-user-control-menu-button-desc" }, props.desc));
        }
    };
    return (React.createElement("button", { className: "current-user-control-menu-button", type: "button" },
        React.createElement("div", { className: "current-user-control-menu-button-icon" }, getIcon()),
        React.createElement("div", { className: "current-user-control-menu-button-content" },
            React.createElement("p", { className: "current-user-control-menu-button-label" }, props.label),
            getDesc())));
};
const CurrentUserControlMenu = () => {
    return (React.createElement("div", { id: "current-user-control-menu" },
        React.createElement("div", { className: "current-user-control-menu-section" },
            React.createElement(CurrentUserControlMenuButton, { label: "Online", status: UserStatus.Online })),
        React.createElement("div", { className: "current-user-control-menu-section" },
            React.createElement(CurrentUserControlMenuButton, { label: "Idle", status: UserStatus.Away }),
            React.createElement(CurrentUserControlMenuButton, { desc: "You will not receive any desktop notifications.", label: "Do Not Disturb", status: UserStatus.Busy }),
            React.createElement(CurrentUserControlMenuButton, { desc: "You will not appear online, but will have full access to all of Discord.", label: "Invisible", status: UserStatus.Offline })),
        React.createElement("div", { className: "current-user-control-menu-section" },
            React.createElement(CurrentUserControlMenuButton, { icon: "fa-regular fa-face-grin", label: "Set a custom status" })),
        React.createElement("div", { className: "current-user-control-menu-section" },
            React.createElement(CurrentUserControlMenuButton, { icon: "fa-solid fa-arrows-repeat", label: "Switch Accounts" }))));
};
const CurrentUserControlButton = (props) => {
    return (React.createElement("button", { className: "current-user-control-button" },
        React.createElement("i", { className: props.icon }),
        React.createElement(Tooltip, { direction: TooltipDirection.Top, text: props.tooltip })));
};
const CurrentUserControl = () => {
    const { user } = React.useContext(AppContext);
    const [menuToggled, toggleMenu] = React.useState(true);
    const handleOnClick = () => {
        toggleMenu(!menuToggled);
    };
    const getMenu = () => {
        if (menuToggled) {
            return (React.createElement(CurrentUserControlMenu, null));
        }
    };
    return (React.createElement("div", { id: "current-user-control" },
        React.createElement("div", { id: "current-user" },
            React.createElement("button", { id: "current-user-menu-button", type: "button", onClick: handleOnClick },
                React.createElement(UserIcon, { user: user })),
            React.createElement("div", { id: "current-user-details" },
                React.createElement("label", { id: "current-user-username" }, user.username),
                React.createElement("label", { id: "current-user-id" },
                    "#",
                    user.id)),
            React.createElement("div", { id: "current-user-control-buttons" },
                React.createElement(CurrentUserControlButton, { icon: "fa-solid fa-microphone", tooltip: "Mute" }),
                React.createElement(CurrentUserControlButton, { icon: "fa-solid fa-headphones", tooltip: "Deafen" }),
                React.createElement(CurrentUserControlButton, { icon: "fa-solid fa-gear", tooltip: "User Settings" }))),
        getMenu()));
};
const DirectMessages = () => {
    const getItems = () => {
        const users = [{
                id: "5555",
                image: "./3.jpg",
                status: UserStatus.Away,
                username: "naem"
            }, {
                activity: "Streaming Fire",
                id: "3456",
                image: "./1.png",
                status: UserStatus.Busy,
                username: "web"
            }, {
                id: "4567",
                image: "./2.png",
                status: UserStatus.Online,
                username: "net2life"
            }];
        return users.map((user) => {
            const getActivity = () => {
                if (user.activity) {
                    return (React.createElement("p", { className: "direct-messages-item-user-activity" }, user.activity));
                }
            };
            return (React.createElement("div", { className: "direct-messages-item content-navigator-button", key: user.id },
                React.createElement(UserIcon, { user: user }),
                React.createElement("div", { className: "direct-messages-item-user-info" },
                    React.createElement("p", { className: "direct-messages-item-username" }, user.username),
                    getActivity()),
                React.createElement("button", { className: "direct-messages-item-close-button", type: "button" },
                    React.createElement("i", { className: "fa-solid fa-xmark" }))));
        });
    };
    return (React.createElement("div", { id: "direct-messages" },
        React.createElement("div", { id: "direct-messages-header" },
            React.createElement("h3", { id: "direct-messages-title" }, "Direct Messages"),
            React.createElement("button", { id: "direct-messages-add-button", type: "button" },
                React.createElement("i", { className: "fa-solid fa-plus" }),
                React.createElement(Tooltip, { direction: TooltipDirection.Top, text: "Create DM" }))),
        React.createElement("div", { id: "direct-messages-items" }, getItems())));
};
const ContentNavigatorButton = (props) => {
    return (React.createElement("button", { className: "content-navigator-button", type: "button" }, props.children));
};
const ContentNavigator = () => {
    return (React.createElement("div", { id: "content-navigator" },
        React.createElement("button", { id: "content-navigator-search-bar-toggle", type: "button" }, "Find or start a conversation"),
        React.createElement(CurrentUserControl, null),
        React.createElement("div", { className: "content-navigator-section" },
            React.createElement(ContentNavigatorButton, null,
                React.createElement("i", { className: "fa-solid fa-person-drowning" }),
                React.createElement("p", null, "Friends")),
            React.createElement(ContentNavigatorButton, null,
                React.createElement("i", { className: "fa-solid fa-fire" }),
                React.createElement("p", null, "Nitro")),
            React.createElement(DirectMessages, null),
            React.createElement("a", { id: "youtube-link", href: "https://www.youtube.com/c/TheTerminalBoy", target: "_blank" },
                React.createElement("i", { className: "fa-brands fa-youtube" }),
                React.createElement("span", null, "Subscribe Us")))));
};
const NavbarItem = (props) => {
    const { state, selectContentID } = React.useContext(AppContext);
    const handleOnClick = () => {
        selectContentID(props.contentID);
    };
    const getContent = () => {
        if (props.icon) {
            const getStyles = () => {
                const styles = {};
                if (props.color) {
                    styles.color = `rgb(${props.color})`;
                }
                return styles;
            };
            return (React.createElement("i", { className: props.icon, style: getStyles() }));
        }
        else if (props.image) {
            const styles = {
                backgroundImage: `url(${props.image})`
            };
            return (React.createElement("div", { className: "navbar-item-image", style: styles }));
        }
    };
    const getClasses = () => {
        return classNames("navbar-item", props.type.toLowerCase(), {
            active: props.contentID === state.activeContentID
        });
    };
    return (React.createElement("button", { type: "button", className: getClasses(), onClick: handleOnClick },
        React.createElement("div", { className: "navbar-item-content" }, getContent()),
        React.createElement(Tooltip, { text: props.label })));
};
const Navbar = () => {
    const getCustomItems = () => {
        const items = [{
                contentID: CustomContentID.PizzaLoversServer,
                image: "./ttbg.png",
                label: "The terminal Boy"
            }, {
                contentID: CustomContentID.GamingServer,
                image: "./py.png",
                label: "python Players"
            }, {
                contentID: CustomContentID.PandaPeopleServer,
                image: "./cap.png",
                label: "Team Captain"
            }];
        return items.map((item) => (React.createElement(NavbarItem, { key: item.contentID, contentID: item.contentID, image: item.image, label: item.label, type: NavbarItemType.Custom })));
    };
    return (React.createElement("div", { id: "navbar-wrapper" },
        React.createElement("div", { id: "navbar" },
            React.createElement("div", { className: "navbar-section" },
                React.createElement(NavbarItem, { contentID: ContentID.Home, icon: "fa-brands fa-discord", label: "Home", type: NavbarItemType.Home })),
            React.createElement("div", { className: "navbar-section" },
                getCustomItems(),
                React.createElement(NavbarItem, { contentID: ContentID.AddServer, icon: "fa-solid fa-plus", label: "Add a Server", type: NavbarItemType.Default }),
                React.createElement(NavbarItem, { contentID: ContentID.Explore, icon: "fa-solid fa-compass", label: "Explore Public Servers", type: NavbarItemType.Default })))));
};
const AppContext = React.createContext(null);
const Discord = () => {
    const [state, setStateTo] = React.useState({
        activeContentID: ContentID.Home,
        user: {
            id: "1234",
            image: "./ttb.png",
            status: UserStatus.Online,
            username: "TTB"
        }
    });
    const selectContentID = (contentID) => {
        setStateTo(Object.assign(Object.assign({}, state), { activeContentID: contentID }));
    };
    return (React.createElement(AppContext.Provider, { value: { state, user: state.user, setStateTo, selectContentID } },
        React.createElement("div", { id: "discord-app" },
            React.createElement(Navbar, null),
            React.createElement(ContentNavigator, null),
            React.createElement(ActiveContent, null))));
};
ReactDOM.render(React.createElement(Discord, null), document.getElementById("root"));