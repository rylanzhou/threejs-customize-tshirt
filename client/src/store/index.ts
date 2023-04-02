import { proxy } from 'valtio';

const state = proxy({
  // are we currently in the home page
  intro: true,

  // configuration for the t-shirt
  color: '#efbd48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
});

export default state;
