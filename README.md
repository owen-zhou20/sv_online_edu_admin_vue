# sv_online_edu_admin_vue

Sv-edu online course website. It is a website for customers to buy and play course videos online. This application is made in 3 projects below:

Back-end: It is the back-end service for the below 2 front-end projects. It is built with Java on Springboot2 based on Microservices and Spring Cloud. 
          It used MyBatis-Plus to do CRUD work and Nacos, OpenFeign and Spring Cloud Gateway to find and call services. It used AliCloud Object Storage 
          Service(OSS) to store pictures and ApsaraVideo VOD service to store videos and play online. Use Short Message Service(SMS) to send verification code 
          and JWT Token to authentication after login. 

Admin front-end: It’s an admin management system and admins and teachers can manage teachers, courses, videos and other data for the website. 
                 It is built with Vue2.0 and Element-UI. It includes an ACL service with Spring Security to control roles and permissions for this system. 
                 This ACL service makes sure that different users only can operate the actions when they get those permissions.

Member Website: It’s a website for members to search, buy and play courses, teachers and videos online. It is built with Vue2.0 on Nuxt. 
                Members scan Wechat(Weixin) QR code to log in(OAuth2.0) and then pay for their course order. 
                Members also can receive short messages(SMS) to register by phone number.




 This sv_online_edu_vue project is front end for the sv online_edu project. 
 
 The sv_online_edu_admin is the admin management front-end system for the sv online_edu project. 
 The sv_online_edu_front is the user front-end website system for the sv online_edu project.

 This 3 systems need to run separately.