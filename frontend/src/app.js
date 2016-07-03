/**
 * Class representing layout
 */
export class App {
  /**
   * Router configuration callback
   * @param {configuration-object} config - Configuration object
   * @param {router} router - Client-side router
   * @returns {undefined}
   */
  configureRouter(config, router) {
    config.title = 'Nginx log parser';
    config.map([
      {
        route: ['', 'main'],
        name: 'main',
        moduleId: './main',
        nav: true,
        title: 'Main',
      },
    ]);
    this.router = router;
  }
}
