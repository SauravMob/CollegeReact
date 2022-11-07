import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Face5Icon from '@mui/icons-material/Face5';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon/>,
        link: "/"
    },
    {
        title: "All Students",
        icon: <PeopleAltIcon/>,
        link: "/all"
    },
    {
        title: "Specific Student",
        icon: <Face5Icon/>,
        link: "/specific"
    },
    {
        title: "Admission",
        icon: <AccountBalanceIcon/>,
        link: "/admission"
    },
]