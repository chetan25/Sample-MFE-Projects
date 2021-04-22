declare module "auth/AuthApp" { 
    const mountAuth: (el: HTMLElement, options: {}) => {
      onContainerNavigate: any
    }; 
   
    export { mountAuth }; 
  } 