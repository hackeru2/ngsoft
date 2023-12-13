<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'due_date','user_id'];
 /**
     * Find tasks with a search query.
     *
     * @param string $query The search query.
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public static function findWithSearchQuery($query)
    {
        // Return tasks where title or description contains the query
        return self::where('title', 'like', '%' . $query . '%')
        ->orWhere('description', 'like', '%' . $query . '%')
        ->paginate(10)->toArray();
    }
}