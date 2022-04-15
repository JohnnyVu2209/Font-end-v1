import { getFormattedDate } from "../helpers/ultilities";


export const account = {
    username: "Admin1",
    password: "Admin123",
    information: [
        { role: ["ADMIN"] }
    ]
}


export const userHeader = [
    {
		name: 'Id',
		selector: row => row.Id,
		sortable: true,
		omit: true,
	},
    {
        name: 'FullName',
        selector: row => row.FirstName + ' ' + row.LastName,
        sortable: true,
    },
    {
        name: 'Gender',
        selector: row => row.Gender ? 'Male':'Female',
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.Email,
        sortable: true,
    },
    {
        name: 'Phone',
        selector: row => row.PhoneNumber,
        sortable: true,
    },
    {
        name: 'Dateofbirth',
        selector: row => getFormattedDate(row.DateOfBirth),
        sortable: true,
    },
    {
        name: 'Address',
        selector: row => row.Address,
        sortable: true,
    },
    {
        name: 'Role',
        selector: row => row.Role.Name,
        sortable: true,
    }
];

export const userFilterHeader = [
  {
    Header: 'Id',
    accessor: 'Id'
  },
  {
    Header: 'Full Name',
    accessor: d => `${d.FirstName} ${d.LastName}`
  },
  {
    Header: 'Gender',
    accessor: d => `${d.Gender ? 'Male' : 'Female'}`
  },
  {
    Header: 'Email',
    accessor: 'Email'
  },
  {
    Header: 'Phone',
    accessor: 'Phone'
  },
  {
    Header: 'Dateofbirth',
    accessor: 'Dateofbirth'
  },
  {
    Header: 'Address',
    accessor: 'Address'
  },
  {
    Header: 'Role',
    accessor: 'Role.Name'
  },
]

export const userModalHeader = [
    {
		name: 'Id',
		selector: row => row.Id,
		sortable: true,
		omit: true,
	},
    {
        name: 'FullName',
        selector: row => row.FirstName + ' ' + row.LastName,
        sortable: true,
    },
    {
        name: 'Gender',
        selector: row => row.Gender ?  'Male':'Female',
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.Email,
        sortable: true,
    },
    {
        name: 'Role',
        selector: row => row.Role.Name,
        sortable: true,
    }
];


export const userList = {
    "CurrentPage": 1,
    "TotalItems": 52,
    "TotalPages": 2,
    "Items" : [
        {
            "Id": "00968f53-3b9c-460c-ad50-961dbeb9b1ea",
            "FirstName": "Minh Hieu",
            "LastName": "Thai",
            "Email": "thaiminhhieu@gmail.com",
            "PhoneNumber": "028 7105 9999",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "69 Đặng Thùy Trâm, Phường 13, Bình Thạnh, Thành phố Hồ Chí Minh",
            "DateOfBirth": "2004-07-25T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "Tester",
            "Role": {
              "Id": "72542410-259f-42c4-8d4b-17a60e228a76",
              "Name": "ADMIN",
              "Permissions": [
                {
                  "Id": "45e02d85-5a62-4528-a2ab-01fd329dffd0",
                  "Name": "Center",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                },
                {
                  "Id": "ede4b2a1-3fce-4274-be8f-4cfaa5c8dd28",
                  "Name": "User",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                }
              ]
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.2951552"
          },
          {
            "Id": "957ebcba-832c-4917-930e-2093f9fc9132",
            "FirstName": "Hồng Duy",
            "LastName": "Hán",
            "Email": "barsix@docsb.site",
            "PhoneNumber": "0559335776",
            "Center": {
              "Id": "e3d1094d-2a22-490c-91d0-20b7c5922657",
              "Name": "Trung tâm Pháp ngữ VLU"
            },
            "Address": "Provincial Road 8, Mui Lon 1 Hamlet, Tan An Hoi Ward,Cu Chi Dist.,Ho Chi Minh City",
            "DateOfBirth": "2007-09-14T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "tester",
            "Role": {
              "Id": "19c7b89e-c601-42b9-b9fd-03e8136587b6",
              "Name": "TEACHER",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.308282"
          },
          {
            "Id": "dab81596-e744-463f-87e1-3cfb607ae8bd",
            "FirstName": "Công Uẩn",
            "LastName": "Dương",
            "Email": "sytilina60@mantutimaison.com",
            "PhoneNumber": "0995690490",
            "Center": {
              "Id": "e3d1094d-2a22-490c-91d0-20b7c5922657",
              "Name": "Trung tâm Pháp ngữ VLU"
            },
            "Address": "Room 304, Cao Thang, Dist.3, Ho Chi Minh City",
            "DateOfBirth": "1998-04-14T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "redlime",
            "Role": {
              "Id": "19c7b89e-c601-42b9-b9fd-03e8136587b6",
              "Name": "TEACHER",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.3342284"
          },
          {
            "Id": "2ad8d9e7-be62-4808-97f7-0e0021f616a7",
            "FirstName": "Công Uẩn",
            "LastName": "Nhữ",
            "Email": "ramzes1220@mantutimaison.com",
            "PhoneNumber": "0995690490",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "Provincial Road 8, Mui Lon 1 Hamlet, Tan An Hoi Ward,Cu Chi Dist.,Ho Chi Minh City",
            "DateOfBirth": "2017-10-28T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "banefox",
            "Role": {
              "Id": "72542410-259f-42c4-8d4b-17a60e228a76",
              "Name": "ADMIN",
              "Permissions": [
                {
                  "Id": "45e02d85-5a62-4528-a2ab-01fd329dffd0",
                  "Name": "Center",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                },
                {
                  "Id": "ede4b2a1-3fce-4274-be8f-4cfaa5c8dd28",
                  "Name": "User",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                }
              ]
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.35077"
          },
          {
            "Id": "03bfaed3-8abb-413a-a101-467b44ff60bc",
            "FirstName": "Toàn",
            "LastName": "Phùng",
            "Email": "praburn@24hinbox.com",
            "PhoneNumber": "0361111376",
            "Center": {
              "Id": "e3d1094d-2a22-490c-91d0-20b7c5922657",
              "Name": "Trung tâm Pháp ngữ VLU"
            },
            "Address": "10 HAM THUYEN STREET, BINH THO WARD,Thu Duc District, Ho Chi Minh City",
            "DateOfBirth": "1991-12-06T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "altoweb",
            "Role": {
              "Id": "19c7b89e-c601-42b9-b9fd-03e8136587b6",
              "Name": "TEACHER",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.3719461"
          },
          {
            "Id": "8f268cb0-7b67-4178-bd14-05027342d829",
            "FirstName": "Ngọc Bảo",
            "LastName": "H’ma",
            "Email": "praburn@24hinbox.com",
            "PhoneNumber": "0896135679",
            "Center": {
              "Id": "e3d1094d-2a22-490c-91d0-20b7c5922657",
              "Name": "Trung tâm Pháp ngữ VLU"
            },
            "Address": "15C Le Ngoc Han, Hai Ba Trung District, Hanoi",
            "DateOfBirth": "2000-04-26T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "kumquat",
            "Role": {
              "Id": "7ca9edc4-4323-4ea7-9d73-6ea6aacfc2e6",
              "Name": "CENTRAL ADMIN",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.3942955"
          },
          {
            "Id": "2ccee362-eae2-4c49-88fb-ca59a84e2963",
            "FirstName": "Lợi",
            "LastName": "Bàng",
            "Email": "ramzes1220@mantutimaison.com",
            "PhoneNumber": "0559006288",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "Thoi Thuan, Thot Not, Can Tho",
            "DateOfBirth": "2008-04-23T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "noodles",
            "Role": {
              "Id": "72542410-259f-42c4-8d4b-17a60e228a76",
              "Name": "ADMIN",
              "Permissions": [
                {
                  "Id": "45e02d85-5a62-4528-a2ab-01fd329dffd0",
                  "Name": "Center",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                },
                {
                  "Id": "ede4b2a1-3fce-4274-be8f-4cfaa5c8dd28",
                  "Name": "User",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                }
              ]
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.4141105"
          },
          {
            "Id": "d74d3ef1-d36d-4b2a-a5ba-954d288a37e6",
            "FirstName": "Quý Ly",
            "LastName": "Nhữ",
            "Email": "sheenada@manghinsu.com",
            "PhoneNumber": "0559371367",
            "Center": {
              "Id": "4b6a2781-9095-48b1-bff8-23178bdc1b4e",
              "Name": "Trung tâm dạy thêm lớp 10, 11, 12"
            },
            "Address": "162 Thai Ha, Dong Da Dist., Hanoi",
            "DateOfBirth": "2003-07-26T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "oyster",
            "Role": {
              "Id": "afced39f-94d3-4577-96ee-03fb41fbe42c",
              "Name": "STUDENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.4294691"
          },
          {
            "Id": "ba1ba48f-c3be-47b2-984a-6c951d5f46a2",
            "FirstName": "Vĩnh San",
            "LastName": "Âu",
            "Email": "praburn@24hinbox.com",
            "PhoneNumber": "0898042189",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "Thoi Thuan, Thot Not, Can Tho",
            "DateOfBirth": "1998-03-30T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "swallow",
            "Role": {
              "Id": "72542410-259f-42c4-8d4b-17a60e228a76",
              "Name": "ADMIN",
              "Permissions": [
                {
                  "Id": "45e02d85-5a62-4528-a2ab-01fd329dffd0",
                  "Name": "Center",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                },
                {
                  "Id": "ede4b2a1-3fce-4274-be8f-4cfaa5c8dd28",
                  "Name": "User",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                }
              ]
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.4505643"
          },
          {
            "Id": "1483ed9a-7915-4639-9978-a47eaa8763ee",
            "FirstName": "Thủ Độ",
            "LastName": "Phù",
            "Email": "shaggy1184@uioct.com",
            "PhoneNumber": "0994250307",
            "Center": {
              "Id": "2c1134c7-09f7-4860-9da7-4ae099f83581",
              "Name": "Trung tâm Nhật ngữ VLU"
            },
            "Address": "24 Nguyen Binh Khiem Street, Dakao Ward, District 1,Ho Chi Minh City",
            "DateOfBirth": "2005-06-09T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "steel",
            "Role": {
              "Id": "7ca9edc4-4323-4ea7-9d73-6ea6aacfc2e6",
              "Name": "CENTRAL ADMIN",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.4842279"
          },
          {
            "Id": "e1497be4-0c5c-423d-9e51-cf23b78d1808",
            "FirstName": "Toàn",
            "LastName": "Ông",
            "Email": "ramosq@outluk.co",
            "PhoneNumber": "0896916940",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "37-C9 Phuong Mai Street, Dong Da District, Hanoi",
            "DateOfBirth": "2010-10-29T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "pudding",
            "Role": {
              "Id": "afced39f-94d3-4577-96ee-03fb41fbe42c",
              "Name": "STUDENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.5091091"
          },
          {
            "Id": "a513556a-85e5-4f17-ab14-d2a805a6e1a2",
            "FirstName": "Toàn",
            "LastName": "Trần",
            "Email": "jeanpled@ccre1.club",
            "PhoneNumber": "0597042959",
            "Center": {
              "Id": "2c1134c7-09f7-4860-9da7-4ae099f83581",
              "Name": "Trung tâm Nhật ngữ VLU"
            },
            "Address": "80 Tran Hung Dao, Hai Cang Ward, Binh Dinh,Qui Nhon",
            "DateOfBirth": "2017-11-24T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "crummy",
            "Role": {
              "Id": "82f2f987-1bea-47a4-a532-4a54e20f4d18",
              "Name": "PARENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.5276346"
          },
          {
            "Id": "17395760-765f-4ac3-9376-e40965bf271e",
            "FirstName": "Toản",
            "LastName": "Huỳnh",
            "Email": "ramzes1220@mantutimaison.com",
            "PhoneNumber": "0597042959",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "243/47 To Hien Thanh St., Ward 13, Dist. 10, Ho Chi Minh City",
            "DateOfBirth": "2012-11-12T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "morbid",
            "Role": {
              "Id": "72542410-259f-42c4-8d4b-17a60e228a76",
              "Name": "ADMIN",
              "Permissions": [
                {
                  "Id": "45e02d85-5a62-4528-a2ab-01fd329dffd0",
                  "Name": "Center",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                },
                {
                  "Id": "ede4b2a1-3fce-4274-be8f-4cfaa5c8dd28",
                  "Name": "User",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                }
              ]
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.5550706"
          },
          {
            "Id": "46979a7c-e3d9-4b70-9e1a-f916567b5aea",
            "FirstName": "Hoàn",
            "LastName": "Bàn",
            "Email": "praburn@24hinbox.com",
            "PhoneNumber": "0899203228",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "499 Ba Hat St., Ward 8, Dist. 10,Ho Chi Minh City",
            "DateOfBirth": "1998-11-27T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "scared",
            "Role": {
              "Id": "82f2f987-1bea-47a4-a532-4a54e20f4d18",
              "Name": "PARENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.5787366"
          },
          {
            "Id": "e271462d-baf5-4b1b-af09-f9162e34fb2f",
            "FirstName": "Vĩnh San",
            "LastName": "H’nia",
            "Email": "barsix@docsb.site",
            "PhoneNumber": "0309720542",
            "Center": {
              "Id": "4b6a2781-9095-48b1-bff8-23178bdc1b4e",
              "Name": "Trung tâm dạy thêm lớp 10, 11, 12"
            },
            "Address": "15C Le Ngoc Han, Hai Ba Trung District, Hanoi",
            "DateOfBirth": "2006-06-08T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "bubbly",
            "Role": {
              "Id": "19c7b89e-c601-42b9-b9fd-03e8136587b6",
              "Name": "TEACHER",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.6196799"
          },
          {
            "Id": "af99e4a1-79f4-4f74-baeb-5771260bf969",
            "FirstName": "Nguyên Trừng",
            "LastName": "Ân",
            "Email": "9700188@seekmore.online",
            "PhoneNumber": "0831819759",
            "Center": {
              "Id": "e3d1094d-2a22-490c-91d0-20b7c5922657",
              "Name": "Trung tâm Pháp ngữ VLU"
            },
            "Address": "364 Cong Hoa, Tan Binh Dist,  Ho Chi Minh City",
            "DateOfBirth": "2009-02-13T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "gloomy",
            "Role": {
              "Id": "7ca9edc4-4323-4ea7-9d73-6ea6aacfc2e6",
              "Name": "CENTRAL ADMIN",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.6449124"
          },
          {
            "Id": "2b7e6989-54d2-4e83-ab3b-735572b2c5f1",
            "FirstName": "Tuân",
            "LastName": "Phú",
            "Email": "barsix@docsb.site",
            "PhoneNumber": "0309217419",
            "Center": {
              "Id": "e3d1094d-2a22-490c-91d0-20b7c5922657",
              "Name": "Trung tâm Pháp ngữ VLU"
            },
            "Address": "15C Le Ngoc Han, Hai Ba Trung District, Hanoi",
            "DateOfBirth": "2019-03-01T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "solemn",
            "Role": {
              "Id": "afced39f-94d3-4577-96ee-03fb41fbe42c",
              "Name": "STUDENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.6711792"
          },
          {
            "Id": "4d4c5650-6f9f-4e4a-ad2b-3d2ea736838c",
            "FirstName": "Cảnh",
            "LastName": "Ân",
            "Email": "kutsimamedov@melowsa.com",
            "PhoneNumber": "0991729328",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "95 TRAN QUANG KHAI STREET, DISTRICT 1",
            "DateOfBirth": "2021-12-05T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "amused",
            "Role": {
              "Id": "72542410-259f-42c4-8d4b-17a60e228a76",
              "Name": "ADMIN",
              "Permissions": [
                {
                  "Id": "45e02d85-5a62-4528-a2ab-01fd329dffd0",
                  "Name": "Center",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                },
                {
                  "Id": "ede4b2a1-3fce-4274-be8f-4cfaa5c8dd28",
                  "Name": "User",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                }
              ]
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.698413"
          },
          {
            "Id": "56017813-978b-4f3e-80e7-3af4f54358b2",
            "FirstName": "Thủ Độ",
            "LastName": "Ân",
            "Email": "kutsimamedov@melowsa.com",
            "PhoneNumber": "0359518896",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "72 Nguyen Thien Thuat Street, Nha Trang City",
            "DateOfBirth": "2014-11-13T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "ardent",
            "Role": {
              "Id": "72542410-259f-42c4-8d4b-17a60e228a76",
              "Name": "ADMIN",
              "Permissions": [
                {
                  "Id": "45e02d85-5a62-4528-a2ab-01fd329dffd0",
                  "Name": "Center",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                },
                {
                  "Id": "ede4b2a1-3fce-4274-be8f-4cfaa5c8dd28",
                  "Name": "User",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                }
              ]
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.7334619"
          },
          {
            "Id": "f455de7d-1acf-4798-85ef-bcdf81f75263",
            "FirstName": "Ninh",
            "LastName": "Ngũ",
            "Email": "9700188@seekmore.online",
            "PhoneNumber": "0896916940",
            "Center": {
              "Id": "2c1134c7-09f7-4860-9da7-4ae099f83581",
              "Name": "Trung tâm Nhật ngữ VLU"
            },
            "Address": "15C Le Ngoc Han, Hai Ba Trung District, Hanoi",
            "DateOfBirth": "1995-04-06T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "somber",
            "Role": {
              "Id": "7ca9edc4-4323-4ea7-9d73-6ea6aacfc2e6",
              "Name": "CENTRAL ADMIN",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.761464"
          },
          {
            "Id": "a4417d14-e2b1-4ebf-a3f0-894907e86686",
            "FirstName": "Cảnh",
            "LastName": "H’nia",
            "Email": "sytilina60@mantutimaison.com",
            "PhoneNumber": "0790743432",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "62 X54 Warehouse, Bat Trang Ward",
            "DateOfBirth": "2012-07-30T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "mellow",
            "Role": {
              "Id": "82f2f987-1bea-47a4-a532-4a54e20f4d18",
              "Name": "PARENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.7829261"
          },
          {
            "Id": "a7eee457-df52-4803-8501-a8f2cf170bde",
            "FirstName": "Thuyết",
            "LastName": "Đặng",
            "Email": "sytilina60@mantutimaison.com",
            "PhoneNumber": "0359518896",
            "Center": {
              "Id": "f4bb617d-f8fb-470b-9489-f93f3ee6baf7",
              "Name": "Trung tâm anh ngữ VLU"
            },
            "Address": "437/2/4 Hoang Van Thu St., HCM",
            "DateOfBirth": "2006-05-07T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "guilty",
            "Role": {
              "Id": "7ca9edc4-4323-4ea7-9d73-6ea6aacfc2e6",
              "Name": "CENTRAL ADMIN",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.8172763"
          },
          {
            "Id": "01c04d10-8594-48f7-b793-c2c5051e948d",
            "FirstName": "Tài Em",
            "LastName": "Ngũ",
            "Email": "ramzes1220@mantutimaison.com",
            "PhoneNumber": "0522181675",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "Provincial Road 8, Mui Lon 1 Hamlet, Tan An Hoi Ward,Cu Chi Dist.,Ho Chi Minh City",
            "DateOfBirth": "2003-07-15T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "cranky",
            "Role": {
              "Id": "19c7b89e-c601-42b9-b9fd-03e8136587b6",
              "Name": "TEACHER",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.8443383"
          },
          {
            "Id": "602338a6-bd4d-4f3d-a562-c118502eae85",
            "FirstName": "Tuân",
            "LastName": "Hán",
            "Email": "barsix@docsb.site",
            "PhoneNumber": "0813221589",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "5 Thong Phong Lane, Dong Da Dist., Hanoi",
            "DateOfBirth": "2020-08-09T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "insane",
            "Role": {
              "Id": "72542410-259f-42c4-8d4b-17a60e228a76",
              "Name": "ADMIN",
              "Permissions": [
                {
                  "Id": "45e02d85-5a62-4528-a2ab-01fd329dffd0",
                  "Name": "Center",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                },
                {
                  "Id": "ede4b2a1-3fce-4274-be8f-4cfaa5c8dd28",
                  "Name": "User",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                }
              ]
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.8623806"
          },
          {
            "Id": "4bee0035-9322-42c6-a63c-6d40279c23fe",
            "FirstName": "Hoàn",
            "LastName": "Nhữ",
            "Email": "barsix@docsb.site",
            "PhoneNumber": "0896108093",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "499 Ba Hat St., Ward 8, Dist. 10,Ho Chi Minh City",
            "DateOfBirth": "2008-11-14T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "joyful",
            "Role": {
              "Id": "72542410-259f-42c4-8d4b-17a60e228a76",
              "Name": "ADMIN",
              "Permissions": [
                {
                  "Id": "45e02d85-5a62-4528-a2ab-01fd329dffd0",
                  "Name": "Center",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                },
                {
                  "Id": "ede4b2a1-3fce-4274-be8f-4cfaa5c8dd28",
                  "Name": "User",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                }
              ]
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.8837592"
          },
          {
            "Id": "becbff27-15d0-4fbd-8d30-f6d8f207b1da",
            "FirstName": "Trinh",
            "LastName": "Ông",
            "Email": "barsix@docsb.site",
            "PhoneNumber": "0969221528",
            "Center": {
              "Id": "2c1134c7-09f7-4860-9da7-4ae099f83581",
              "Name": "Trung tâm Nhật ngữ VLU"
            },
            "Address": "Unit 403, Floor 4, North Star Buiding 4 Da Tuong Street, Hoan Kiem District",
            "DateOfBirth": "2010-02-01T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "dreary",
            "Role": {
              "Id": "82f2f987-1bea-47a4-a532-4a54e20f4d18",
              "Name": "PARENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.9102581"
          },
          {
            "Id": "fe835105-0e5b-4cc0-864a-3f1d6d1cc874",
            "FirstName": "Diễm Phúc",
            "LastName": "Hà",
            "Email": "sytilina60@mantutimaison.com",
            "PhoneNumber": "0899343113",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "Dong An Industrial Park, Thuan An District",
            "DateOfBirth": "1988-04-10T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "crabbe",
            "Role": {
              "Id": "72542410-259f-42c4-8d4b-17a60e228a76",
              "Name": "ADMIN",
              "Permissions": [
                {
                  "Id": "45e02d85-5a62-4528-a2ab-01fd329dffd0",
                  "Name": "Center",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                },
                {
                  "Id": "ede4b2a1-3fce-4274-be8f-4cfaa5c8dd28",
                  "Name": "User",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                }
              ]
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.936534"
          },
          {
            "Id": "2dca6596-b80d-4fa8-9737-78a4cb7d5f85",
            "FirstName": "Bộ Lĩnh",
            "LastName": "Lý",
            "Email": "barsix@docsb.site",
            "PhoneNumber": "0899203228",
            "Center": {
              "Id": "e3d1094d-2a22-490c-91d0-20b7c5922657",
              "Name": "Trung tâm Pháp ngữ VLU"
            },
            "Address": "492/38A Line 30-4, Ward 10, Ba Ria-vung Tau, Vung Tau",
            "DateOfBirth": "1994-06-24T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "alicia",
            "Role": {
              "Id": "19c7b89e-c601-42b9-b9fd-03e8136587b6",
              "Name": "TEACHER",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.9515877"
          },
          {
            "Id": "c8093123-11c9-44f6-b17a-2866770cfeb7",
            "FirstName": "Mỹ Dạ",
            "LastName": "Ân",
            "Email": "praburn@24hinbox.com",
            "PhoneNumber": "0896775813",
            "Center": {
              "Id": "f4bb617d-f8fb-470b-9489-f93f3ee6baf7",
              "Name": "Trung tâm anh ngữ VLU"
            },
            "Address": "441E Phan Van Han St., Ward 17, Binh Thanh Dist., Ho Chi Minh City",
            "DateOfBirth": "1990-10-11T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "seeker",
            "Role": {
              "Id": "7ca9edc4-4323-4ea7-9d73-6ea6aacfc2e6",
              "Name": "CENTRAL ADMIN",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.9753416"
          },
          {
            "Id": "5d11e42f-7351-44eb-b40d-b75090f095a2",
            "FirstName": "Ngọc Bảo",
            "LastName": "Bá",
            "Email": "jeanpled@ccre1.club",
            "PhoneNumber": "0559380008",
            "Center": {
              "Id": "4b6a2781-9095-48b1-bff8-23178bdc1b4e",
              "Name": "Trung tâm dạy thêm lớp 10, 11, 12"
            },
            "Address": "37-C9 Phuong Mai Street, Dong Da District, Hanoi",
            "DateOfBirth": "2016-05-20T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "hagrid",
            "Role": {
              "Id": "19c7b89e-c601-42b9-b9fd-03e8136587b6",
              "Name": "TEACHER",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:02.9888885"
          },
          {
            "Id": "49c031b5-646c-4080-9896-bdea45cc10a4",
            "FirstName": "Diễm Phúc",
            "LastName": "Phùng",
            "Email": "sytilina60@mantutimaison.com",
            "PhoneNumber": "0593703127",
            "Center": {
              "Id": "4b6a2781-9095-48b1-bff8-23178bdc1b4e",
              "Name": "Trung tâm dạy thêm lớp 10, 11, 12"
            },
            "Address": "64/715B NGUYEN OANG STREET, WARD 17,Go Vap District, Ho Chi Minh City",
            "DateOfBirth": "2009-12-18T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "owlery",
            "Role": {
              "Id": "19c7b89e-c601-42b9-b9fd-03e8136587b6",
              "Name": "TEACHER",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.0002644"
          },
          {
            "Id": "e03862b5-e235-48aa-b217-40a09a4f5104",
            "FirstName": "Ánh Viên",
            "LastName": "Ngụy",
            "Email": "ramzes1220@mantutimaison.com",
            "PhoneNumber": "0896775813",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "106 Phuong Mai Street, Dong Da District, Hanoi",
            "DateOfBirth": "2003-12-05T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "fawkes",
            "Role": {
              "Id": "7ca9edc4-4323-4ea7-9d73-6ea6aacfc2e6",
              "Name": "CENTRAL ADMIN",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.0090963"
          },
          {
            "Id": "a5c77ff6-700e-4f8b-956e-e6e921ccfba2",
            "FirstName": "Thuyết",
            "LastName": "Hạ",
            "Email": "shaggy1184@uioct.com",
            "PhoneNumber": "0790743432",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "72 Nguyen Thien Thuat Street, Nha Trang City",
            "DateOfBirth": "2015-01-24T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "emeric",
            "Role": {
              "Id": "7ca9edc4-4323-4ea7-9d73-6ea6aacfc2e6",
              "Name": "CENTRAL ADMIN",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.0328349"
          },
          {
            "Id": "f03f4aea-827f-44d7-97c7-706dcf318b6f",
            "FirstName": "Tuấn",
            "LastName": "Âu",
            "Email": "shaggy1184@uioct.com",
            "PhoneNumber": "0523223736",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "99 Khuong Trung Street, Thanh Xuan District, Hanoi",
            "DateOfBirth": "1998-10-11T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "hussan",
            "Role": {
              "Id": "72542410-259f-42c4-8d4b-17a60e228a76",
              "Name": "ADMIN",
              "Permissions": [
                {
                  "Id": "45e02d85-5a62-4528-a2ab-01fd329dffd0",
                  "Name": "Center",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                },
                {
                  "Id": "ede4b2a1-3fce-4274-be8f-4cfaa5c8dd28",
                  "Name": "User",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                }
              ]
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.050841"
          },
          {
            "Id": "fdb3d009-fb9e-4f52-8c49-cc96264f7258",
            "FirstName": "Quý Ly",
            "LastName": "Ngụy",
            "Email": "kutsimamedov@melowsa.com",
            "PhoneNumber": "0896090820",
            "Center": {
              "Id": "4b6a2781-9095-48b1-bff8-23178bdc1b4e",
              "Name": "Trung tâm dạy thêm lớp 10, 11, 12"
            },
            "Address": "21 Đang Tien Đong Street,Dong Da District, Hanoi",
            "DateOfBirth": "2020-11-17T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "skrewt",
            "Role": {
              "Id": "19c7b89e-c601-42b9-b9fd-03e8136587b6",
              "Name": "TEACHER",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.0753063"
          },
          {
            "Id": "bf6503ee-f3e4-477f-b698-666f17ed9a26",
            "FirstName": "Trinh",
            "LastName": "H’nia",
            "Email": "barsix@docsb.site",
            "PhoneNumber": "0783203170",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "Block B2-35, Street 2, Tan Dong Hiep B Industrial Park",
            "DateOfBirth": "1995-02-12T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "malkin",
            "Role": {
              "Id": "72542410-259f-42c4-8d4b-17a60e228a76",
              "Name": "ADMIN",
              "Permissions": [
                {
                  "Id": "45e02d85-5a62-4528-a2ab-01fd329dffd0",
                  "Name": "Center",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                },
                {
                  "Id": "ede4b2a1-3fce-4274-be8f-4cfaa5c8dd28",
                  "Name": "User",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                }
              ]
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.0968746"
          },
          {
            "Id": "a6a522e6-f2f7-41f3-95bc-32b087bbbeb0",
            "FirstName": "Dung",
            "LastName": "Dương",
            "Email": "kutsimamedov@melowsa.com",
            "PhoneNumber": "0559452412",
            "Center": {
              "Id": "4b6a2781-9095-48b1-bff8-23178bdc1b4e",
              "Name": "Trung tâm dạy thêm lớp 10, 11, 12"
            },
            "Address": "45/1 Binh Tien Street, Ward 7, District 6, Ho Chi Minh City",
            "DateOfBirth": "2013-08-15T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "prongs",
            "Role": {
              "Id": "afced39f-94d3-4577-96ee-03fb41fbe42c",
              "Name": "STUDENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.1082114"
          },
          {
            "Id": "2600b923-6bf3-4ecf-8b37-3d2990ed7846",
            "FirstName": "Hoàn",
            "LastName": "Phó",
            "Email": "sytilina60@mantutimaison.com",
            "PhoneNumber": "0370084523",
            "Center": {
              "Id": "f4bb617d-f8fb-470b-9489-f93f3ee6baf7",
              "Name": "Trung tâm anh ngữ VLU"
            },
            "Address": "71B Hung Vuong, Ward 6, Dist.6, Ho Chi Minh City",
            "DateOfBirth": "1992-01-07T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "crucio",
            "Role": {
              "Id": "82f2f987-1bea-47a4-a532-4a54e20f4d18",
              "Name": "PARENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.142683"
          },
          {
            "Id": "cd6e7db5-06f5-4bd4-83c8-4e6325dd9452",
            "FirstName": "Hoàng",
            "LastName": "Bàn",
            "Email": "9700188@seekmore.online",
            "PhoneNumber": "0783203170",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "74 Hoang Van Hop Street, An Lac A Ward,Binh Tan District,Ho Chi Minh City",
            "DateOfBirth": "1996-05-19T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "erised",
            "Role": {
              "Id": "82f2f987-1bea-47a4-a532-4a54e20f4d18",
              "Name": "PARENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.1774271"
          },
          {
            "Id": "29a32111-8bd2-4b1e-82f0-39e5507085de",
            "FirstName": "Toản",
            "LastName": "Trần",
            "Email": "praburn@24hinbox.com",
            "PhoneNumber": "0831819759",
            "Center": {
              "Id": "f4bb617d-f8fb-470b-9489-f93f3ee6baf7",
              "Name": "Trung tâm anh ngữ VLU"
            },
            "Address": "398/1 Le Van Si StreetWard 14, District 3",
            "DateOfBirth": "1989-10-20T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "aragog",
            "Role": {
              "Id": "7ca9edc4-4323-4ea7-9d73-6ea6aacfc2e6",
              "Name": "CENTRAL ADMIN",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.1898635"
          },
          {
            "Id": "a1da21b5-0f81-4e7d-b9cf-e3ab820410ea",
            "FirstName": "Quý Ly",
            "LastName": "Anh",
            "Email": "sytilina60@mantutimaison.com",
            "PhoneNumber": "0359518896",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "74 Hoang Van Hop Street, An Lac A Ward,Binh Tan District,Ho Chi Minh City",
            "DateOfBirth": "2002-03-03T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "kappas",
            "Role": {
              "Id": "7ca9edc4-4323-4ea7-9d73-6ea6aacfc2e6",
              "Name": "CENTRAL ADMIN",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.2133354"
          },
          {
            "Id": "87bc5ec1-08f2-49c0-b614-fa85a3a22afb",
            "FirstName": "Quang Phục",
            "LastName": "Nguyễn",
            "Email": "shaggy1184@uioct.com",
            "PhoneNumber": "0317938264",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "437/2/4 Hoang Van Thu St., HCM",
            "DateOfBirth": "2007-08-25T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "jarvey",
            "Role": {
              "Id": "72542410-259f-42c4-8d4b-17a60e228a76",
              "Name": "ADMIN",
              "Permissions": [
                {
                  "Id": "45e02d85-5a62-4528-a2ab-01fd329dffd0",
                  "Name": "Center",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                },
                {
                  "Id": "ede4b2a1-3fce-4274-be8f-4cfaa5c8dd28",
                  "Name": "User",
                  "View": true,
                  "Create": true,
                  "Edit": true,
                  "Delete": true
                }
              ]
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.2247089"
          },
          {
            "Id": "1e9ee171-4879-483f-952e-f1f539c4f016",
            "FirstName": "Mỹ Dạ",
            "LastName": "Ong",
            "Email": "praburn@24hinbox.com",
            "PhoneNumber": "0898832607",
            "Center": {
              "Id": "2c1134c7-09f7-4860-9da7-4ae099f83581",
              "Name": "Trung tâm Nhật ngữ VLU"
            },
            "Address": "Dong An Industrial Park, Thuan An District",
            "DateOfBirth": "2012-05-14T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "peeves",
            "Role": {
              "Id": "19c7b89e-c601-42b9-b9fd-03e8136587b6",
              "Name": "TEACHER",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.2496025"
          },
          {
            "Id": "36549ec7-4027-4b0a-aa00-8171f9528eaa",
            "FirstName": "Tài Em",
            "LastName": "Phí",
            "Email": "ramosq@outluk.co",
            "PhoneNumber": "0522181675",
            "Center": {
              "Id": "2c1134c7-09f7-4860-9da7-4ae099f83581",
              "Name": "Trung tâm Nhật ngữ VLU"
            },
            "Address": "11 Street 3A, Bien Hoa 2 Iindustrial Park, Bien Hoa City, Dong Nai",
            "DateOfBirth": "2003-05-09T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "lucius",
            "Role": {
              "Id": "afced39f-94d3-4577-96ee-03fb41fbe42c",
              "Name": "STUDENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.2654724"
          },
          {
            "Id": "3efb36e2-2a0c-42f5-b783-e2ca3baff733",
            "FirstName": "Thủ Độ",
            "LastName": "Phùng",
            "Email": "praburn@24hinbox.com",
            "PhoneNumber": "0359518896",
            "Center": {
              "Id": "f4bb617d-f8fb-470b-9489-f93f3ee6baf7",
              "Name": "Trung tâm anh ngữ VLU"
            },
            "Address": "162 Thai Ha, Dong Da Dist., Hanoi",
            "DateOfBirth": "1996-09-07T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "bertie",
            "Role": {
              "Id": "82f2f987-1bea-47a4-a532-4a54e20f4d18",
              "Name": "PARENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.2814457"
          },
          {
            "Id": "0e611fb2-f955-4ffb-98bd-d39498cdda61",
            "FirstName": "Đông Triều",
            "LastName": "Lê",
            "Email": "ramzes1220@mantutimaison.com",
            "PhoneNumber": "0998981723",
            "Center": {
              "Id": "2c1134c7-09f7-4860-9da7-4ae099f83581",
              "Name": "Trung tâm Nhật ngữ VLU"
            },
            "Address": "Km72, Highway 13,Chon Thanh Town,   Binh Phuoc",
            "DateOfBirth": "2006-11-24T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "mcboon",
            "Role": {
              "Id": "19c7b89e-c601-42b9-b9fd-03e8136587b6",
              "Name": "TEACHER",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.3115657"
          },
          {
            "Id": "d155a446-a3b1-4341-8c6f-4f6fd6a7c064",
            "FirstName": "Ngọc Bảo",
            "LastName": "Phí",
            "Email": "barsix@docsb.site",
            "PhoneNumber": "0397227728",
            "Center": {
              "Id": "4b6a2781-9095-48b1-bff8-23178bdc1b4e",
              "Name": "Trung tâm dạy thêm lớp 10, 11, 12"
            },
            "Address": "122 Ha Long Street, Ward 2",
            "DateOfBirth": "1991-09-11T00:00:00",
            "Gender": false,
            "AvatarName": null,
            "UserName": "beater",
            "Role": {
              "Id": "afced39f-94d3-4577-96ee-03fb41fbe42c",
              "Name": "STUDENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.3474459"
          },
          {
            "Id": "d9317b3b-489d-4ca9-8a2e-03367205cfb7",
            "FirstName": "Đông Triều",
            "LastName": "Phan",
            "Email": "sheenada@manghinsu.com",
            "PhoneNumber": "0559380008",
            "Center": {
              "Id": "386f9198-1b57-4d28-85ae-88ee90ff27a8",
              "Name": "UNAVAILABLE"
            },
            "Address": "106 Phuong Mai Street, Dong Da District, Hanoi",
            "DateOfBirth": "2011-07-17T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "lemons",
            "Role": {
              "Id": "82f2f987-1bea-47a4-a532-4a54e20f4d18",
              "Name": "PARENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.3815085"
          },
          {
            "Id": "1cc09abb-eb79-45c6-a621-2512ced6ea56",
            "FirstName": "Ánh",
            "LastName": "Hồ",
            "Email": "jeanpled@ccre1.club",
            "PhoneNumber": "0896871324",
            "Center": {
              "Id": "4b6a2781-9095-48b1-bff8-23178bdc1b4e",
              "Name": "Trung tâm dạy thêm lớp 10, 11, 12"
            },
            "Address": "162 Thai Ha, Dong Da Dist., Hanoi",
            "DateOfBirth": "2008-10-28T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "diagon",
            "Role": {
              "Id": "82f2f987-1bea-47a4-a532-4a54e20f4d18",
              "Name": "PARENT",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.4194969"
          },
          {
            "Id": "bc7cfde0-0bfc-47f0-8a03-dc245f81f9e5",
            "FirstName": "Tùng",
            "LastName": "Nguyễn",
            "Email": "shaggy1184@uioct.com",
            "PhoneNumber": "0523223736",
            "Center": {
              "Id": "f4bb617d-f8fb-470b-9489-f93f3ee6baf7",
              "Name": "Trung tâm anh ngữ VLU"
            },
            "Address": "170 National Highway 1A, Block 5, Tan Thoi Nhat Ward",
            "DateOfBirth": "2000-06-14T00:00:00",
            "Gender": true,
            "AvatarName": null,
            "UserName": "bagman",
            "Role": {
              "Id": "7ca9edc4-4323-4ea7-9d73-6ea6aacfc2e6",
              "Name": "CENTRAL ADMIN",
              "Permissions": []
            },
            "ImageSrc": null,
            "LastModified": "2022-03-14T14:10:03.4483787"
          }
    ]
}