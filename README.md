# Persenk-Ultra

To quote the [official website](http://persenk-ultra.com):

>"Persenk Ultra is a mountain foot race with a high degree of difficulty, with a great elevation gain (5387 m), variety of weather conditions (night and day) and long distance (132 km), which challenges participants’ endurance and requires excellent physical and mental preparation, proper equipment and strong-willed spirit."

The goal of this project is to create a web service that allows supporters and fans to track the runners' progress (at what time do they leave each aid station/checkpoint) and for the aid station volunteers to easily mark when the runners leave a checkpoint.

Functionality overview:
* Table with all the runners and the time they leave each aid station. The table can be sorted by the best (earliest) time of leaving a checkpoint. It can also be searched by runner name and number. 
* An administrator user can add and edit runner categories, runners, aid stations and other users (both administrators and volunteers) as well as edit runners aid station leave times.
* Volunteers can only edit the leave times of runners.
* Anonymous (unregistered) users can only look at the table.

The backend of the project is written in Java and running on Apache Tomcat. It provides a RESTful API that allows easy interfacing with different platforms. The web frontend uses Bootstrap and jQuery. An Android mobile application is considered, but not yet planned seriously. For more technical details, please check out the wiki.

This project is released under the Apache License 2.0 (see the LICENSE file for details).
