export enum AppRoute {
    Root = '/',
    Login = 'login',
    Favorites = 'favorites',
    Offer = 'offer/:id'
  }

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
  }

export enum APIRoute {
    Offers = 'offers',
    CurrentOffer = '/offers/{offerId}',
    NearByOffers = '/offers/{offerId}/nearby',
    Favorite = '/favorite'
  }
