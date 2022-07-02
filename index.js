const xml2js = require('xml2js');


const builder = ( quote_params ) => {
    
    var obj = {
        RateRequest: {
            $: {xmlns: "http://fedex.com/ws/rate/v13"},
            WebAuthenticationDetail: {
                UserCredential:{
                    Key: 'bkjIgUhxdghtLw9L',
                    Password: '6p8oOccHmDwuJZCyJs44wQ0Iw'
                }
            },
            ClientDetail: {
                AccountNumber: 510087720,
                MeterNumber: 119238439,
                Localization: {
                    LanguageCode: 'es',
                    LocaleCode: 'mx',
                }
            },
            Version: {
                ServiceId: 'crs',
                Major: 13,
                Intermediate: 0,
                Minor: 0,
            },
            ReturnTransitAndCommit: true,
            RequestedShipment: {
                DropoffType: 'REGULAR_PICKUP',
                PackagingType: 'YOUR_PACKAGING',
                Shipper: {
                    Address: {
                        StreetLines: {},
                        City: {},
                        StateOrProvinceCode: 'XX',
                        PostalCode: quote_params.address_from.zip,
                        CountryCode: quote_params.address_from.country
                    }
                },
                Recipient: {
                    Address: {
                        StreetLines: {},
                        City: {},
                        StateOrProvinceCode: 'XX',
                        PostalCode: quote_params.address_to.zip,
                        CountryCode: quote_params.address_to.country,
                        Residential: false
                    } 
                },
                ShippingChargesPayment: {
                    PaymentType: 'SENDER'
                },
                RateRequestTypes: 'ACCOUNT',
                PackageCount: 1,
                RequestedPackageLineItems: {
                    GroupPackageCount: 1,
                    Weight: {
                        Units: quote_params.parcel.mass_unit,
                        Value: quote_params.parcel.weight,
                    },
                    Dimensions:{
                        Length: quote_params.parcel.length,
                        Width: quote_params.parcel.width,
                        Height: quote_params.parcel.height,
                        Units: quote_params.parcel.distance_unit
                    }
                }
            }
        }
    }
     
    var builder = new xml2js.Builder({headless: true} );
    var xml = builder.buildObject(obj);
    // console.log(xml)
    return xml;

};

const respJson = (body) => {
    xml2js.parseString(body, function (err, results) {
        // parsing to json
        let data = JSON.stringify(results)
          
        // display the json data
        console.log(data);
        });
}
module.exports = {
    builder,
    respJson
};