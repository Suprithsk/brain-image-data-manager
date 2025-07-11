# API Documentation

## Filter Dataset (FD)

This API allows you to retrieve filtered dataset information based on various criteria.

### Endpoint (FD)

`POST https://gqgrf37lx0.execute-api.us-east-1.amazonaws.com/dataset/{projectTitle}`

### Path Parameters (FD)

| Parameter      | Type   | Description                                                        |
| -------------- | ------ | ------------------------------------------------------------------ |
| `projectTitle` | string | **Required**. Title of the project to filter. Example: `000-0-001` |

### Query Parameters (FD)

| Parameter   | Type    | Description                                                                   |
| ----------- | ------- | ----------------------------------------------------------------------------- |
| `limit`     | integer | The maximum number of records to return per page. Default: `10`. Example: `2` |
| `page`      | integer | The page number to retrieve. Default: `1`. Example: `1`                       |
| `sponsorId` | string  | An optional ID to filter datasets by sponsor. Example: `INTRW-000`            |

### Request Body Fields (FD)

| Field        | Type     | Required | Description                                        |
| ------------ | -------- | -------- | -------------------------------------------------- |
| `orderBy`    | string   | No       | Field name to order results by (e.g., `createdAt`) |
| `order`      | string   | No       | Order direction: `asc` or `desc`                   |
| `attributes` | object   | No       | Key-value pairs for attribute-based filtering      |
| `title`      | string   | No       | Title of the dataset                               |
| `modality`   | string[] | No       | List of datasets that has those modalities         |

### Example Request Body (FD)

```json
{
  "orderBy": "createdAt",
  "order": "desc",
  "attributes": {
    "sex": "M",
    "group": "SDI-18"
  },
  "title": "DEC2024",
  "sid": "103005",
  "modality": ["BLOCKFACE-STP", "BLOCKFACE-WIDEFIELD"]
}
```

### Example Response (FD)

```json
{
  "data": [
    {
      "hash": "3a463603c0be2c792dc3ec8da92bc170",
      "title": "SAN-20DEC2024-01",
      "sid": "103005",
      "dataset": "401-2-002_BLK-20250117-01_202501024-01_SAN-20DEC2024-01",
      "modality": "BLOCKFACE-STP",
      "physicalSections": 100,
      "device": {
        "_id": "672b15cbb902a6767d113fbe",
        "deviceName": "MARINUS-MP",
        "modalities": ["BLOCKFACE-STP", "STP"],
        "ownedBy": "ALL"
      },
      "channels": 3,
      "attributes": {
        "sex": "M",
        "genoType": "HOM",
        "group": "SDI-18"
      },
      "pyramidRegistrationStatus": "COMPLETED",
      "atlasStatus": "COMPLETED",
      "updatedAt": "2025-05-21T08:05:09.683Z",
      "isRegistered": false
    },
    {
      "hash": "5760f897cb46657666af4509838685d6",
      "title": "SAN-20DEC2024-08",
      "sid": "103005",
      "dataset": "401-2-002_BLK-20250117-01_202501024-01_SAN-20DEC2024-08",
      "modality": "BLOCKFACE-STP",
      "physicalSections": 100,
      "device": {
        "_id": "672b15cbb902a6767d113fbe",
        "deviceName": "MARINUS-MP",
        "modalities": ["BLOCKFACE-STP", "STP"],
        "ownedBy": "ALL"
      },
      "channels": 3,
      "attributes": {
        "sex": "M",
        "genoType": "HOM",
        "group": "SDI-18"
      },
      "pyramidRegistrationStatus": "COMPLETED",
      "atlasStatus": "COMPLETED",
      "updatedAt": "2025-02-21T14:00:36.300Z",
      "isRegistered": false
    }
  ],
  "total": 2,
  "currentPage": 1,
  "totalPages": 1
}
```

## Get Dataset Details (DD)

This API allows you to retrieve detailed information about a specific dataset.

### Endpoint (DD)

`GET https://gqgrf37lx0.execute-api.us-east-1.amazonaws.com/dataset/{datasetHash}`

### Path Parameters (DD)

| Parameter     | Type   | Description                                                                                                                                              |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `datasetHash` | string | **Required**. Unique hash identifier of the dataset which you got from [Filter Dataset](#filter-dataset-fd). Example: `385f60d68394dc51871a53a01b375f1c` |

### Example Response (DD)

```json
{
  "title": "SAN-13DEC2023-08",
  "hash": "385f60d68394dc51871a53a01b375f1c",
  "description": "Male Rat with group SDI-18",
  "sid": "21234",
  "device": {
    "_id": "672b15cbb902a6767d113fbe",
    "deviceName": "MARINUS-MP"
  },
  "tissueType": "BRAIN",
  "blockId": "20231222-03_20240111-01",
  "dataset": "401-2-002_BLK-20231222-03_20240111-01_SAN-13DEC2023-08",
  "modality": "BLOCKFACE-STP",
  "primaryDataSet": "",
  "physicalSpacing": 50,
  "physicalSections": 1,
  "pixelSize": 1.38,
  "bitDepth": 16,
  "isRegistered": false,
  "channels": [
    {
      "num": 1,
      "name": "Channel 1",
      "attributes": {}
    },
    {
      "num": 2,
      "name": "Channel 2",
      "attributes": {}
    },
    {
      "num": 3,
      "name": "Channel 3",
      "attributes": {}
    }
  ],
  "attributes": {
    "sex": "M",
    "group": "SDI-18"
  },
  "pyramidRegistrationStatus": "MANUAL",
  "createdAt": "2025-06-10T13:19:55.555Z",
  "updatedAt": "2025-06-10T13:19:55.555Z",
  "secondaryModalities": [],
  "sectionRange": []
}
```

## Get Files List (FL)

This API allows you to retrieve a list of files associated with a specific dataset.

### Endpoint (FL)

`GET https://gqgrf37lx0.execute-api.us-east-1.amazonaws.com/manage/files?prefix={datasetPath}`

### Query Parameters (FL)

| Parameter   | Type   | Description                                                                                                                      |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`    | string | **Required**. Prefix of the dataset path. Example: `INTRW-000/000-0-001/401-2-002_BLK-20231222-03_20240111-01_SAN-13DEC2023-34/` |
| `pageToken` | string | Next Page from [This Note](#note-fl-1).                                                                                          |

### Note (FL)

- From [Filter Dataset](#filter-dataset-fd) API, you can get the [SponsorID](#query-parameters-fd) and [Project Title](#path-parameters-fd) which is the prefix of the dataset.

### Example Response (FL)

```json
{
  "message": "Keys fetched successfully",
  "data": {
    "keys": [
      {
        "key": "INTRW-000/000-0-001/401-2-002_BLK-20231222-03_20240111-01_SAN-13DEC2023-34/401-2-002_BLK-20231222-03_20240111-01_SAN-13DEC2023-34_S000001_L01_ch01.tif",
        "size": 292210,
        "lastModified": "2025-06-10T12:09:18.000Z"
      }
    ],
    "subFolders": [],
    "nextContinuationToken": "1nvc5AeqjEpqnrhTbEMIFqguK6HSicD1C/3FULkaB4dz3yagDb4bz1KA5G5PHexzpYMCz/FXAarztX8T54556m8gGqKUTgRCrAykyzwgi0L/ZBZpLcGI1xHugOFljx0aR8DmtkUhGgL5MDRNP6o7iK0AspLk+6grkpbaxSP9whvLZL4zMvr2uwNE9CAB8tpLbP6dTiDVUtKUovYCEjUvQB5gkAydqLBCQthtJ8zPpVvyDCld0ttMOVL947dvwGVAW"
  }
}
```

### Note (FL) 1

- `nextContinuationToken` is used to get the next page of files.
- If `nextContinuationToken` is not present, then you have reached the end of the files.

## Start Download (SD)

This API allows you to initiate a download of a specific files or whole Folder from the dataset.

### Endpoint (SD)

`POST https://gqgrf37lx0.execute-api.us-east-1.amazonaws.com/download`

### Request Body Fields (SD)

| Field    | Type     | Required | Description                                                                                                |
| -------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `files`  | string[] | No       | List of files to download. Example: [Check here](#example-request-body-sd)                                 |
| `folder` | string   | No       | Folder to download. Example: `INTRW-000/000-0-001/401-2-002_BLK-20231222-03_20240111-01_SAN-13DEC2023-34/` |

### Example Request Body (SD)

```json
{
  "files": [
    "INTRW-000/000-0-001/401-2-002_BLK-20231222-03_20240111-01_SAN-13DEC2023-34/401-2-002_BLK-20231222-03_20240111-01_SAN-13DEC2023-34_S000002_L01_ch02.tif",
    "INTRW-000/000-0-001/401-2-002_BLK-20231222-03_20240111-01_SAN-13DEC2023-34/401-2-002_BLK-20231222-03_20240111-01_SAN-13DEC2023-34_S000008_L01_ch02.tif"
  ]
}
```

```json
{
  "folder": "INTRW-000/000-0-001/401-2-002_BLK-20231222-03_20240111-01_SAN-13DEC2023-34/"
}
```

### Example Response (SD)

```json
{
  "message": "CREATED",
  "ref": "a79f7799-7e6b-4f57-a8c5-777c1dc77149"
}
```

### Note (SD)

- `ref` is used to check the status of the download.
- You can check the status of the download using [Get Download Status](#download-progress) API.

## Download Progress

This API allows you to check the progress of a download.

### Endpoint (GDS)

`GET https://gqgrf37lx0.execute-api.us-east-1.amazonaws.com/download/progress/{refId}`

### Path Parameters (GDS)

| Parameter | Type   | Description                                                                                                                     |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `refId`   | string | **Required**. Reference ID of the download. [Check Here](#example-response-sd). Example: `a79f7799-7e6b-4f57-a8c5-777c1dc77149` |

### Example Response (GDS)

```json
{
  "message": "IN_PROGRESS",
  "percentageCompleted": 10
}
```

```json
{
  "message": "COMPLETED",
  "url": ""
}
```

### Note (GDS)

- If the download is completed, then you will get the URL of the download.
- After 30min of inactivity, the progress will be deleted. You have to start the download again.

## Cancel Download

This API allows you to cancel a download.

### Endpoint (CD)

`POST https://gqgrf37lx0.execute-api.us-east-1.amazonaws.com/download/cancel`

### Request Body Fields (CD)

| Field | Type   | Required | Description                                                                                                       |
| ----- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| refId | string | Yes      | Reference ID of the download. [Check Here](#example-response-sd). Example: `a79f7799-7e6b-4f57-a8c5-777c1dc77149` |

### Example Request Body (CD)

```json
{
  "refId": "a79f7799-7e6b-4f57-a8c5-777c1dc77149"
}
```

### Example Response (CD)

```json
{
  "message": "Aborted"
}
```
