
export const API_URL = import.meta.env.VITE_SERVER_URL;

export const sortSelect = [
    {
        value: "_sort=level",
        title: "Level ABC"
    },
    {
        value: "_sort=-level",
        title: "Level CBA"
    },
    {
        value: "_sort=completed",
        title: "Complited"
    },
    {
        value: "_sort=-completed",
        title: "No Complited"
    }
];

export const countSort = [
    {
        value: "10",
        title: "10"
    },
    {
        value: "20",
        title: "20"
    },
    {
        value: "30",
        title: "30"
    },
    {
        value: "50",
        title: "50"
    },
    {
        value: "100",
        title: "100"
    }
];

export const level = [
    {
        value: "1",
        title: "1 - easiest"
    },
    {
        value: "2",
        title: "2 - medium"
    },
    {
        value: "3",
        title: "3 - hardest"
    }
];

export const AUTH_STORAGE = "ReactLogin";

export const THEME_STORAGE = "ReactTheme";