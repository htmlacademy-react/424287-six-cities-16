export enum AppRoute {
    Root = '/',
    Login = 'login',
    Favorites = 'favorites',
    Offer = 'offer',
    OfferDetail = 'offer/:id'
  }

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
  }

export enum APIRoute {
    Offers = 'offers',
    CurrentOffer = '/offers',
    NearByOffers = 'nearby',
    Favorite = '/favorite',
    Login = '/login',
    Logout = '/logout',
    Comments = '/comments'
  }

export const SORTING = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] as const;
