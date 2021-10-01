﻿# Leadership-Profile

{Detailed description TBD}


## Legal Information

Copyright (c) 2020 Ed-Fi Alliance, LLC and contributors.

Licensed under the [Apache License, Version 2.0](LICENSE) (the "License").

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.

See [NOTICES](NOTICES.md) for additional copyright and license notifications.

## Application Overview

See [Application Overview](./docs/application-overview.md) for further details.

### Required software

* .net 5 sdk (https://dotnet.microsoft.com/download/dotnet/5.0)
* SQL Server 2019 (https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
* node.js (https://nodejs.org/)
* powershell
* docker _for development only_

## Development Environment

### Repository Access

* Developers can either **clone** or **fork** the repository.
  * If cloning the repo, users must be added to the org and team
  * If forking, you won't need to be added to the org. If you wish to bring the changes back, you can create PR.
* In both cases **The commits must be signed**.
  * If Commits are not signed, they can’t be merged. Please refer [this document](https://techdocs.ed-fi.org/display/ETKB/Signing+Git+Commits) for the setup.
  * Caution: If your commits are not signed, and you want to do that after the fact, it can be an arduous process. It is highly recommended to make sure this works before starting real dev work.
  * CLA must be signed [here](https://cla-assistant.io/Ed-Fi-Exchange-OSS/Leadership-Profile?pullRequest=3).

### Setup Quick Start

See [Developer Setup](./docs/developer-setup.md) for more details and options.

* Install the above _Required Software_ locally
* Run the `setup.ps1` powershell script to install the required powershell modules and build tools
* Set up the database
  * Run `Invoke-Psake DownloadDbTestData` to download the latest sample data backup
  * Unzip and restore the backup in `testdata/EdFi_Ods_Populated_Template_TPDM_10.zip` to your local SQL Server instance
  * Run `Invoke-Psake UpdateLocalDatabase` to migrate the database to the latest version
* Launch the applications
  * Open `src/API/LeadershipProfileAPI/LeadershipProfileAPI.sln` in Visual Studio and launch the LeadershipProfileAPI project
  * Open `src/Web/` in a shell and run `npm install` followed by `npm start`
* Navigate to `localhost`

### Testing the application

To run automated tests, use the following commands in PowerShell from the repository root:

* `Invoke-Psake Test`: Runs all the tests.
* `Invoke-Psake TestAPI`: Runs the API related tests. It runs a docker container with a test database and then runs the API
  test suite.
* `Invoke-Psake TestFrontend`: Runs the frontend tests.

More information on testing can be found in the [Developer Setup](./docs/developer-setup.md) docs.

## Building the application

From the project root directory, run this powershell command: `Invoke-Psake Publish`.
This command will create two zip files in the `artifacts` folder:

* LeadershipProfile-API
* LeadershipProfile-Frontend

## Email

The application is preconfigured to send emails to localhost.
The recommended tool to test the email sending functionality is Papercut SMTP.

For production, change the EmailSettings configuration block in `appsettings.json`:

```json
  "EmailSettings": {
    "Server": "127.0.0.1",
    "Port": 25,
    "Sender": "\"Leadership Portal\" <noreply@test.com>",
    "Username": "",
    "Password": ""
  }
```

Alternatively, you can create a class that implements the `IEmailSender` interface
in `src/API/LeadershipProfileAPI/Infrastructure/Email/IEmailSender.cs` and register it
on the `Startup` class instead of the `SmtpSender` class:

```csharp
  // Replace SmtpSender with your own implementation
  services.AddTransient<IEmailSender, SmtpSender>();
```
