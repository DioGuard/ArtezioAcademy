#============================ Задание №1 ============================#
# Создаём базу данных
create database if not exists db_employees;

# Устанавливаем текущую БД для работы с ней
use db_employees;

# Создаём таблицу с сотрудниками
create table if not exists employees (
	id int not null auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    post varchar(30) not null,
    salary int not null
);

# Вносим данные о сотрудниках
insert into employees values
	(null, "Ivanov", 	"Igor", 	"Programmist", 	30000),
	(null, "Gorbunov", 	"Pavel", 	"Producer", 	40000),
	(null, "Egorov", 	"Stepan", 	"Artist",		25000),
	(null, "Belov", 	"Ivan", 	"Scenarist", 	27000),
	(null, "Pletkin", 	"Jonny", 	"Programmist", 	50000);
#=============================== END ================================#

#============================ Задание №2 ============================#
# Выполняем запрос #1, указанный в задании
select * from employees
	where salary < 30000;
    
# Выполняем запрос #2, указанный в задании
select * from employees
	where salary < 30000 and post = "Artist";
#=============================== END ================================#

#============================ Задание №3 ============================#
# Создаём вспомогательную таблицу к первой, 
# в которой будут храниться данные о подчинённых и начальниках
create table if not exists chief_subord(
	id int not null auto_increment primary key,
    chief_id int,
    subord_id int,
	foreign key(chief_id) references employees(id),
    foreign key(subord_id) references employees(id)
);
    
# Вносим данные о подчинённых и начальниках
insert into chief_subord values
	(null, 	5, 		1),
    (null, 	5, 		3),
    (null, 	5, 		4),
    (null, 	4, 		null),
    (null, 	3, 		null),
    (null, 	2, 		5),
    (null, 	1, 		null),
    (null, 	null, 	2);
    
# Запрашиваем данные о подчинённых сотрудника с id = 5
select e.first_name as "Subordinate" 
	from chief_subord cs 
		left join employees e on cs.subord_id = e.id
			where cs.chief_id = 5;
#=============================== END ================================#
