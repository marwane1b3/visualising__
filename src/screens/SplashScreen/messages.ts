/*
 * SplashScreen Messages
 *
 * This contains all the text for the SplashScreen Screen.
 */

export const scope = 'app.screen.SplashScreen';

const messages = {
  header: {
    scope: `${scope}.header`,
    options: {
      defaultValue: 'This is the SplashScreen Screen!',
    },
  },
  navigateToTutorial: {
    scope: `${scope}.navigateToTutorial`,
    options: {
      defaultValue: 'Navigate To Tutorial!',
    },
  },
  navigateToAuth: {
    scope: `${scope}.navigateToAuth`,
    options: {
      defaultValue: 'Navigate To Auth!',
    },
  },
  exploreMode: {
    scope: `${scope}.exploreMode`,
    options: {
      defaultValue: 'Explore App!',
    },
  },
};

export default messages;
