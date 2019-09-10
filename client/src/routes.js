import HomePage from './pages/Home/Home.jsx';
import AboutPage from './pages/About/About.jsx';
import WorkshopPage from './pages/Workshop/Workshop.jsx';
import ContactPage from './pages/Contact/Contact.jsx';
import DetialPage from './pages/Hackathon/Details.jsx';
import RegistrationPage from './pages/Registration/RegistrationPage.jsx';
import SubscribePage from './pages/Newsletter/Subscribe.jsx';
import UnSubMemberPage from './pages/Newsletter/UnSubMember.jsx';
import UnSubHackerPage from './pages/Newsletter/UnSubHacker.jsx';

const routes = [
    {
        path: '/',
        component: HomePage,
        exact: true,
    },
    {
        path: '/about',
        component: AboutPage,
    },
    {
        path: '/contact',
        component: ContactPage,
    },
    {
        path: '/workshop',
        component: WorkshopPage,
    },
    {
        path: '/hackathon/:id',
        component: DetialPage,
    },
    {
        path: '/register/:id',
        component: RegistrationPage,
    },
    {
        path: '/subs',
        component: SubscribePage,
    },
    {
        path: '/unsubmember/:token',
        component: UnSubMemberPage,
    },
    {
        path: '/unsubhacker/:token',
        component: UnSubHackerPage,
    },
];

export default routes;
