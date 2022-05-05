import allTasksPage from '../pages/allTasksPage.js'
import homePage from '../pages/homePage.js'
import projectPage from '../pages/projectPage.js'

const renderMethods={
        'allTasksTab': allTasksPage.generate,
        'homeTab': homePage.generate,
        'projectsTab': projectPage.generate,
}

export default renderMethods;