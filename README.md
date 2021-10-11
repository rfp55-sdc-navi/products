# Hack Reactor System Design Capstone
## Retail Product Page API
The objective of this project was to separate several API endpoints from a monolithic retail product page structure and transition to a micro-services based architecture. This repository contains the implementation of four product-overview endpoints: product list, individual product characteristics, product styles, related products.

Key performance indicators were that under load, each endpoint maintain at least 100 RPS and latency less than 2,000ms, with less than a 1% error rate.


### Tools Used
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-20232A?style=for-the-badge&logo=postgresql&logoColor=blue)
![node.js](https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=nodedotjs&logoColor=green)
![Express](https://img.shields.io/badge/-Express-20232A?style=for-the-badge&logo=express&logoColor=yellow)
![NGINX](https://img.shields.io/badge/Nginx-20232A?style=for-the-badge&logo=nginx&logoColor=green)
![AMAZON AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)


## Results
Ultimately the design far exceeds KPI requirements, delivering between 4,000 and 8,000 RPS and 65-73ms latency (depending on the complexity of the endpoint query), with a a 0.003% error rate.

Accross endpoints, response time for a single query outperforms the previous (monolithic) API implementation by about 30ms.

### Loader.io Test Results

#### Product List endpoint:
* Maximum test load: 5,000 clients per second over 20 seconds
* Latency: 68 ms
* Throughput: 4,983.8 RPS
* Error rate: 0.003%

![products_results]


#### Related Products endpoint:
* Maximum test load: 8,000 clients per second over 20 seconds
* Latency: 69 ms
* Throughput: 7974.05 RPS
* Error rate: 0.003%

![related_results]


#### Single Product Endpoint:
* Maximum test load: 8,000 clients per second over 20 seconds
* Latency: 67 ms
* Throughput: 7973.7 RPS
* Error rate: 0.003%

![singleProduct_results]


#### Styles Endpoint:
* Maximum test load: 4,000 clients per second over 20 seconds
* Latency: 67 ms
* Throughput: 3987.55 ms
* Error rate: 0.003%

![styles_results]


## Implementation

The database is structured using a purely relational database, PostgreSQL, and stores data in five separate tales.

The microservice is designed to include multiple Express servers, deployed and scaled via AWS EC2 instances, and governed by an Nginx load balancer.

Enabled caching in the Nginx load balancer significantly lightens the load on servers and boosts throughput.

![design]

## Contact Me

### Caitlin Kinney

[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/caitlinkinney/)](https://www.linkedin.com/in/caitlinKinney/)

[![GitHub: GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/thecaitlinkinney)](https://github.com/thecaitlinkinney)



<!-- Images -->
[design]: images/products_design.png
[products_results]: images/products_results.png
[related_results]: images/related_results.png
[singleProduct_results]: images/singleProduct_results.png
[styles_results]: images/styles_results.png


