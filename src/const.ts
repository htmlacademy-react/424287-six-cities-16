export enum AppRoute {
    Root = '/',
    Login = 'login',
    Favorites = 'favorites',
    Offer = 'offer'
  }

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
  }

export enum APIRoute {
    Offers = 'offers',
    CurrentOffer = '/{offerId}',
    NearByOffers = '/offers/{offerId}/nearby',
    Favorite = '/favorite',
    Login = '/login',
    Logout = '/logout'
  }
