-- CATEGORY 테이블 생성
CREATE TABLE CATEGORY (
  ca_id SERIAL PRIMARY KEY,
  ca_nm VARCHAR,
  supi_ID INTEGER
);

-- POST 테이블 생성
CREATE TABLE POST (
  POST_ID SERIAL PRIMARY KEY,
  SUBJECT VARCHAR,
  CONTENT TEXT,
  CATEGORY_ID INTEGER REFERENCES CATEGORY(ca_id),
  CREATE_DATE TIMESTAMP,
  UPDATE_DATE TIMESTAMP
);

INSERT INTO public.category VALUES (1, '최상단 부모', NULL);
INSERT INTO public.category VALUES (2, 'CLOUD', 1);
INSERT INTO public.category VALUES (3, 'Docker', 2);
INSERT INTO public.category VALUES (4, 'Kubernetes', 2);
INSERT INTO public.category VALUES (5, 'Google Cloud Platform', 2);
INSERT INTO public.category VALUES (6, 'OS', 1);
INSERT INTO public.category VALUES (7, 'Linux', 6);

INSERT INTO public.post VALUES (nextval('post_post_id_seq'),'쿠버네티스의 정의와 개념', '**[쿠버네티스의 탄생 배경]**
-> 애플리케이션의 배포 환경 변화
**![image](https://velog.velcdn.com/images/holicme7/post/6401695d-160f-475c-a29c-e0be39c3542f/image.png)**
1.Traditional Deployment(전통적 방식)

* \- 가장 오래되고 단순한 방식으로 물리적인 컴퓨터 1대에 1개의 OS를 설치하고\, 여러 프로그램을 설치하는 방식
    \- 같은 컴퓨터 리소스를 공유하므로\, 배포한 애플리케이션 끼리 서로 영향을 미쳐 성능 문제가 발생함
    \- 하드웨어의 성능은 매우 빠르게 좋아지는 반면\, 소프트웨어의 성능은 하드웨어의 성능 발전 속도를 따라가지 못함

이러한 문제점을 해결하기 위해 가상화 방식을 도입했지만,

2.Virtualized Deployment(가상화 방식)

* \- 가상머신은 각각 논리적으로 구분된 가상 환경에서 실행되기 때문에\, 각자 OS 및 리소르를 보유하고 있음
    \- Virtual Machine\(통칭 VM\)이 많을 수록 전통적인 방식에 대비해 성능의 안정성이 떨어지고\, 실행속도가 느려짐
    \- 가상머신은 1개의 완전한 컴퓨터이기에\, 각각의 가상머신에 guest OS를 일일히 설치해야 함

그래서 등장한 개념이 컨테이너이다.

3.Container Deployment(컨테이너 중심의 배포)
\*컨테이너란?
\- Host OS상에 논리적인 구획을 만들어\, 애플리케이션을 작동하는데 필요한 라이브러리나 종속 항목들을 모아 마치 별도의 서버인 것 처럼 사용할 수 있게 만든 것
\- 애플리케이션과 필요한 모든 파일을 1개의 런타임 환경으로 묶는 데 사용하는 기술

\*컨테이너 vs VM
\- 컨테이너는 애플리케이션 간 운영체제를 공유함 
\- OS의 리소스를 논리적으로 분리시키고\, 여러개의 컨테이너가 공유하여 사용
\- 컨테이너는 VM과 달리 프로그램 구동을 위해 OS를 매번 설치할 필요가 없음
\- 1개의 OS 위에서 마치 각각의 독립적인 프로그램처럼 관리되고 실행됨 

\*컨테이너의 특징
\- 오버헤드가 적기 때문에\, 가볍고 고속으로 작동 \(메모리를 적게 차지하고 시작/종료 시간이 적게 걸림\)
\- 애플리케이션 실행에 필요한 모듈을 1개의 컨테이너로 모을 수 있기 때문에\, 여러개의 컨테이너를 조합하여 1개의 애플리케이션을 구축하는 MSA 애플리케이션과 친화성이 높음
\- 다른 컴퓨팅 환경으로 이동하더라도 안정적으로 실행 가능
\- 애플리케이션의 실행에 필요한 라이브러리\, 바이너리 파일\, 기타 구성파일 등을 패키지로 묶어서 배포하면\, 구동 환경이 바뀌어도 실행에 필요한 파일이 함께 따라다녀 오류를 최소화
\- 컨테이너는 OS를 공유하는 방식이기에\, 어떤 프로그램의 문제가 다른 프로그램을 간섭할 수는 없음\. 허나 어떤 프로그램의 문제가 OS에 문제를 일으킬 경우에는 OS에서 구동 중인 전체 컨테이너의 문제가 될 가능
 성이 있음

정의: 컨테이너 오케스트레이션 도구
-컨테이너: 앱이 구동되는 환경까지 감싸서 실행할 수 있도록 하는 격리 기술
-오케스트레이션: 여러 컨테이너 및 사용하는 환경 설정을 관리하는 행위
장점

1. 오토스케일링
    -급격한 부하 급증이나 개별 애플리케이션 부하를 지속적으로 모니터링 할 필요가 없음.
    -각 애플리케이션에서 사용하는 리소스를 모니터링하고 애플리케이션의 실행 중인 인스턴스 수를 계속 조정하도록 지시 가능
    2)애플리케이션 단순화
    -애플리케이션 개발과 프로덕션 환경이 모두 동일하기에 디버깅이 상대적으로 쉬움
    3)롤아웃
    -버전업등의 이슈가 닥쳤을 때 애플리케이션을 중단하지 않고 롤아웃이 가능함
    -만약, 롤아웃 시행 후 문제가 감지되면 즉시 롤아웃을 중지함
    4)상태 확인 및 자가 치유
    -한 노드에서 장애가 발생할 경우 그 노드안의 애플리케이션을 다른 노드로 스케줄링함', 3, '2024-01-11 00:00:00', '2024-01-30 05:08:54.497302');

INSERT INTO public.post VALUES (nextval('post_post_id_seq'),'Cgroups과 namespace', '## **<span style="color: #7cafc2">1\. Cgroup\(Control group\)</span>**

**프로세스 별로 사용하는 시스템의 자원의 사용 정보를 수집하고, 제한하고 격리시키는 리눅스 커널 기능이다.**
![image.png](https://i.imgur.com/hrYe6El.png)
**제한 가능한 자원**

* **CPU** : 스케줄러를 사용하여 해당 cgroup에 속한 프로세스 CPU 사용 시간을 제어함
* **memory** : 해당 cgroup에 속한 프로세스의 메모리 사용량을 제어함
    * 초과 시 oom 발생(oom\_control로 관리할 수 있음)
* **freezer** : cgroup의 작업을 일시중지하거나 다시 시작함
    * 마치 도커의 pause/unpause와 같은 역할
* **blkio** : cgroup의 BlockI/O(Block device(SSD, USB, HDD 등)에 대한 제한을 설정
* **net\_cls** : 네트워크 패킷을 클래스 식별자(classid)로 태그하여 Linux 트래픽 컨트롤러 (**tc**
<br>
    )가 특정 cgroup에서 발생하는 패킷들을 식별할 수 있게 함
* **cpuset** : 개별 CPU 및 메모리 노드를 cgroup에 바인딩 하기 위한 서브시스템. 리눅스의 `testset` 명령과 유사하게 CPU 코어를 할당 할 수 있는 서브시스템임.
* **cpuacct** : cgroup이 사용한 CPU 자원에 대한 보고서를 생성
* **devices** : cgroup 작업 단위로 장치에 대한 엑세스를 허용하거나 거부
* **ns** : namespace 서브시스템

## **<span style="color: #86c1b9">2\. Namespace</span>**

**프로세스별로 별도의 커널 자원을 분할하는 리눅스 커널의 기능이다.**
![image.png](https://i.imgur.com/KrBZnBJ.png)

* **namespace 종류**
    * \*\*Process ID(\*\*pid) : pid 정보를 격리함. 네임스페이스 외 다른 프로세스에 접근이 불가.
    * **Network**(net) : 네트워크 장치, IP주소, 포트, 라우팅 테이블 등 **네트워크 리소스**를 격리하고 가상 네트워크 장치를 할당함.
    * \*\*Filesystem/mount(\*\*mnt) : 프로세스별로 마운트되는 파일시스템을 격리함.
    * **inter-proc comms**(ipc) : inter-process communication을 격리. 다른 프로세스의 접근이나 제어를 방지함.
    * **UTS** : 호스트명, 도메인명을 격리
    * **User** : 프로세스 별로 UID, GID 정보를 격리
* **namespace vs cgroup**
    * cgroup은 해당 **프로세스가 쓸 수 있는 사용량**을 제한한다.
    * namespace는 해당 **프로세스가 볼 수 있는 범위**를 제한한다.', 7, '2024-02-16 05:54:49.159275', '2024-02-16 06:12:16.031502');


INSERT INTO public.post VALUES (nextval('post_post_id_seq'),'도커 개요', '![image.png](https://i.imgur.com/cm6I5Ih.png)', 4, '2024-02-16 06:18:02.937387', '2024-02-16 06:18:02.937387');
