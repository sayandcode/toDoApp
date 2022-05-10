import allTasksPage from '../pages/allTasksPage.js'
import homePage from '../pages/homePage.js'
import projectPage from '../pages/projectPage.js'
import individualProject from '../pages/individualProject.js'

const renderMethods={
        'allTasksTab': allTasksPage,
        'homeTab': homePage,
        'projectsTab': projectPage,
        'individualProject':individualProject
}

export default renderMethods;