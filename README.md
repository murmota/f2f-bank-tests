Запуск приложения:

Перед началом работы убедитесь, что на вашем компьютере установлены следующие инструменты:
Docker Desktop	любая актуальная	docker --version
Docker Compose	v2+	docker compose version
Node.js	18+	node --version
Git	любая	git --version

```
git clone <ссылка-на-репозиторий>
```
```
cd <папка-репозитория>/tets
```
```
docker compose up -d --build
```

Запуск тестов:
```
npx playwright test
```
```
npx playwright show-report
```
Описание найденных багов или неожиданного поведения приложения находится в NOTES.md
