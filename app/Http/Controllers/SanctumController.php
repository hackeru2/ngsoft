<?php

// app/Http/Controllers/SanctumController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SanctumController extends Controller
{
    public function user(Request $request)
    {
        return $request->user();
    }
}
