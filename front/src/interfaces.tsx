export interface form_result {
    request: Request;
  }

export interface data {
    'id': string,
    'date': string,
    'username': string,
    'email': string,
    'country': string
    'city': string,
    'groups': string,
    'verified': boolean,
    'card_verified': boolean,
    'activated': boolean,
    'blocked': boolean
  }

export interface filter_parametrs {
    filter_param: string,
    key: string
    filter_type: string
    filter_body: string
    filter_id: number
}
export interface props {
    count: number
 }