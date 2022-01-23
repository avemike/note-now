from django.http import JsonResponse


def getRoutes(req):
    routes = [
        'GET /api',
        'GET /api/notes',
        'GET /api/notes/:id'
    ]

    return JsonResponse(routes, safe=False)
