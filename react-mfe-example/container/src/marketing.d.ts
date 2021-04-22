declare module "marketing/MarketingApp" { 
    const mountMarketing: (el: HTMLElement, options: {}) => {
      onContainerNavigate: any
    }; 
   
    export { mountMarketing }; 
  } 