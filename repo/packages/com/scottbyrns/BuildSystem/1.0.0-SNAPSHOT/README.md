# Build System
A javascript library for build automation of JDMO (Javascript Dependency Managed Objects) based applications.
This build system relies on a node.js backend for disk access during the build.

#### Minimum Requirements
* Google Chrome
* 256mb Disk Space
* *nix Based OS

## Build System Overview
The build system runs a job to build a target.

### Runner
A runner runs the job.

### Job
A job is a description of how a build must be performed.

### Build
A build is the work unit describing what needs to be done to produce output to a target.

### Target
Build output will be delivered to a target.