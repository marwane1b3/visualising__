const SCREENS = {
  SPLASH: 'screens.SplashScreen',
  TUTORIAL: 'screens.TutorialScreen',
  // auth screens
  SIGNIN: 'screens.SignInScreen',
  REGISTER: 'screens.RegisterScreen',
  FORGOT_PASSWORD: 'screens.ForgotPasswordScreen',
  PASSWORD_CODE_VERIFICATION: 'screens.PasswordCodeVerificationScreen',
  EXTERIOR_AUTH: 'screens.ExteriorAuth',
  EXTERIOR_SIGNIN: 'screens.ExteriorSignIn',
  // Drawer
  HOME: 'screens.HomeScreen', // refers to Main Stack
  USER_PROFILE: 'screens.UserProfileScreen',
  KAALIXUP: 'kaalixUp',
  KAALIX_SMILES: 'screens.KaalixSmilesScreen',
  KAALIX_WIN_POINTS: 'screens.KaaalixWinPointsScreen',
  ORDERS: 'screens.OrdersScreen',
  CASH_BACK: 'screens.CashBackScreen',
  FEEDBACK: 'screens.FeedbackScreen',
  CUSTOMER_SERVICE: 'screens.CustomerServiceScreen',

  NOT_IN_ZONE_SCREEN: 'NotInZoneComponent',

  // Main Stack
  // HOME: 'screens.HomeScreen', >> herited from Drawer
  REFERRAL: 'screens.ReferralScreen',
  KAALIX_PAY: 'screens.KaalixPayScreen',
  REWARDS: 'screens.RewardsScreen',
  Choubik: 'screens.ChoubikScreen',
  MULTI_FILTERS_SCREEN: 'screens.MultiFilterScreen',
  ADDRESSES_LIST: 'screens.AddressScreen',
  MAP_SCREEN: 'screens.MapScreen',
  EXPRESS: 'screens.ExpressScreen',
  RATING: 'screens.RatingScreen',
  POURBOIR: 'screens.PourboirScreen',
  RECLAMATION: 'screens.ReclmationScreen',
  ORDERSSUIVIENCOURS: 'screens.OrdersSuivEncours',
  ORDERHISTORYITEM: 'screeens.OrderHistoryItem',
  // Shopping Stack
  STORES_LIST: 'screens.StoresListScreen',
  PRODUCTS_CATEGORIES: 'screens.ProductsCategoriesScreen',
  PRODUCTS_LIST: 'screens.ProductsListScreen',
  ITEMS_LIST: 'screens.ItemsListScreen',
  ITEM_SPECIFICATIONS: 'screens.ItemSpecificationsScreen',
  SHOPPING_CARD: 'screens.ShoppingCardScreen',
  ACCOMPANIMENT_LIST: 'screens.AccompanimentListScreen',
  CHECKOUT: 'screens.CheckoutScreen',
  SERVICES: 'ServicesNavigator',
  CARD_MANAGER: 'screens.CardManagerScreen',
  PAYMENT: 'screens.PaymentScreen',
  CHECKOUT_PAYMENT: 'screens.CheckoutPaymentScreen',
  ADD_CARD: 'screens.AddCardScreen',
  MY_CARDS: 'screens.MycardsScreen',
  HISORY: 'screens.HistoriesScreen',
  WINPOINTS: 'screens.WinPointsScreen',
  KAALIX_SMILE_HISTORIES: 'screens.KaalixSmileHistoriesScreen',
  KAALIX_WIN_SMILES: 'screens.WinSmilesScreen',
};

const NAVIGATORS = {
  INITIAL: 'InitialNavigator',
  AUTH: 'AuthNavigator',
  PASSWORD_RECOVERY: 'PasswordRecoveryNavigator',
  APP: 'DraweNavigator',

  // Drawer navigators
  MAIN_STACK: 'MainStackNavigator', // shoping nav from home to checkout (HOME_NAV)
  USER_PROFILE: 'UserProfileNavigator',
  ORDERS: 'OrdersNavigator',
  CASH_BACK: 'CashBackNavigator',
  FEEDBACK: 'FeedbackNavigator',
  CUSTOMER_SERVICE: 'CustomerServiceNavigator',
  STORES_LIST: 'StoresListNavigator',
  // Main Stack
  REFERRAL: 'ReferralNavigator',
  KAALIX_PAY: 'KaalixPayNavigator',
  REWARDS: 'RewardsNavigator',
  SHOPPING: 'ShoppingNavigator',
  ADDRESS: 'AddressNavigator',
  KaalixUp: 'KaalixUpNavigator',
  HISORIES: 'HistoriesNavigator',
  // WINPOINTS: 'WinPointsNavigator',
};

const DRAWER_ROUTE_NAME = {
  MAIN_STACK: 'Home',
  USER_PROFILE: 'Mes informations',
  ORDERS: 'Mes commandes',
  CASH_BACK: 'Remboursement',
  FEEDBACK: 'Vos remarques',
  CUSTOMER_SERVICE: 'Service client',
  STORES_LIST: 'Restaurants',
  KaalixUpNavigator: "Kaalix'Up",
  KAALIX_SMILES: 'Kaalix Smile',
};

export { SCREENS, NAVIGATORS, DRAWER_ROUTE_NAME };
