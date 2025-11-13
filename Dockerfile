# Utiliza la imagen oficial de .NET para construir y publicar la app
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["ventas.csproj", "./"]
RUN for i in 1 2 3; do dotnet restore "ventas.csproj" && break || sleep 10; done
COPY . .
WORKDIR "/src/"
RUN dotnet build "ventas.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ventas.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ventas.dll"]
