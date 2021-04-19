// allows webpack to load bootstrap async and give time to go and fetch deps needed for the bootstrap
// this is required since we have shred deps, which won't be loaded if we run the bootstrap file directly
// error -Shared module is not available for eager consumption:
import('./bootstrap');