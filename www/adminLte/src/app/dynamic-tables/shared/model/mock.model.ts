export class InMemoryDataService {
    createDb(): any {

        const model =
        {
            "data": [
                {
                    "id": "0",
                    "type": "gemstonetypes",
                    "links": {
                        "self": "http://192.168.88.58/gemstonetypes/0"
                    },
                    "attributes": {
                        "name": "Не вставка",
                        "namuser": "test@imp-gold.dn.ua"
                    }
                },
                {
                    "id": "1",
                    "type": "gemstonetypes",
                    "links": {
                        "self": "http://192.168.88.58/gemstonetypes/1"
                    },
                    "attributes": {
                        "name": "Драгоценные",
                        "namuser": "admin@imp-gold.dn.ua"
                    }
                },
                {
                    "id": "2",
                    "type": "gemstonetypes",
                    "links": {
                        "self": "http://192.168.88.58/gemstonetypes/2"
                    },
                    "attributes": {
                        "name": "Полудрагоценные",
                        "namuser": "test@imp-gold.dn.ua"
                    }
                },
                {
                    "id": "3",
                    "type": "gemstonetypes",
                    "links": {
                        "self": "http://192.168.88.58/gemstonetypes/3"
                    },
                    "attributes": {
                        "name": "Синтетические",
                        "namuser": "test@imp-gold.dn.ua"
                    }
                },
                {
                    "id": "74",
                    "type": "gemstonetypes",
                    "links": {
                        "self": "http://192.168.88.58/gemstonetypes/74"
                    },
                    "attributes": {
                        "name": "Miracle",
                        "namuser": "rodman@rodman.com"
                    }
                }
            ],
            "meta": {
                "totalrecords": 5,
                "totalpages": 1
            },
            "links": {
                "first": "http://192.168.88.58/gemstonetypes?page%5Bnumber%5D=1&page%5Bsize%5D=10&sort=",
                "last": "http://192.168.88.58/gemstonetypes?page%5Bnumber%5D=1&page%5Bsize%5D=10&sort="
            }
        };

        return model;
    }
}
