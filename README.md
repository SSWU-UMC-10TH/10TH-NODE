## 4주차 실습 인증

![실습 인증](https://github.com/user-attachments/assets/8e9a65f6-e0ba-4b28-964b-431f8bc3cb76)

---

## 4주차 미션 과제

![미션 과제](https://github.com/user-attachments/assets/25f890f1-2db0-4df0-901d-ca8779d573e1)

### 📌 과제 설명

DataGrip을 활용하여 MySQL 데이터베이스 환경에서 직접 데이터베이스를 구축하였다.

기존 2주차에서 설계한 미션/가게/리뷰 기반 서비스 구조를 바탕으로,  
member, region, store, mission, member_mission, review, review_image, member_agree,  
member_prefer, terms, food_category 등 총 11개의 테이블을 생성하였다.

각 테이블은 실제 서비스 흐름을 고려하여 설계하였으며,  
외래키(Foreign Key)를 활용하여 테이블 간의 관계를 설정하였다.  
예를 들어, member와 mission 간의 관계를 member_mission 테이블로 연결하고,  
store와 region, review와 member/store 간의 관계를 통해 데이터의 일관성을 유지하였다.

또한, SHOW TABLES 명령어를 통해 테이블이 정상적으로 생성되었는지 확인하였으며,  
데이터베이스의 구조와 관계형 모델의 개념을 직접 구현해보는 과정이었다.

이를 통해 단순한 테이블 생성이 아닌, 실제 서비스에 적용 가능한 관계형 데이터베이스 구조를 이해할 수 있었다.
